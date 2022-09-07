import { FormComponentListener } from './form-types';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate';
import { capitalize } from '../../utils/utils';
import { Component } from 'react';
import { Text, TextInput, TextStyle, StyleSheet, View, ViewStyle, Image } from 'react-native';
import { FormComponentState, FormComponent, FormComponentProps, ComponentKinds } from './FormComponent';

export interface FormTextComponentOptions {
    multiline?: boolean;
    numberOfLines?: number;
}

export class FormTextComponent
    extends Component<FormComponentProps<string, FormTextComponentOptions>>
    implements FormComponent<string, FormTextComponentOptions> {
    componentKind = 'FormTextComponent' as const;

    handleFieldChanged = (text: string) => {
        if (this.props.onChange) {
            this.props.onChange(text);
        }
    }

    render() {
        let { id,
            value,
            label = capitalize(id),
            options: { multiline = false, numberOfLines = multiline ? 5 : 1 } = { multiline: false },
            errors = undefined,
            style = {},
            labelStyle = {},
            inputStyle = {},
            errorStyle = {},
            answers={},
            answer
        } = this.props;
        const imageData = value as unknown as ImageData;
        return (
            <View style={{ ...styles.view, ...style }}>
                <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
                <TextInput style={{ ...styles.input, ...inputStyle }} value={answer.text}
                    onChangeText={this.handleFieldChanged}
                    multiline={multiline} numberOfLines={numberOfLines} />
                <Text style={{ ...styles.label, ...labelStyle }}>Enter Score Percentage</Text>
                <TextInput style={{ ...styles.input, ...inputStyle }} value={answer.scorePercentage.toString()}
                    onChangeText={this.handleFieldChanged}
                    multiline={multiline} numberOfLines={numberOfLines} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
        padding: 5,
    },
    label: {
        paddingTop: 5,
        fontSize: 20,
        alignSelf: 'flex-start',
    },
    input: {
        fontSize: 20,
        borderColor: "green",
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        padding: 5,
    },
    error: {
        fontSize: 15,
        color: "red",
        borderColor: "red",
        backgroundColor: "#fcbdbd",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        padding: 5,
    }
});
