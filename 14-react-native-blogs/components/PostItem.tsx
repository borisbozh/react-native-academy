import React, { Component } from "react";
import { PostListener, TagListener } from "../model/shared-types";
import { Question, ImageStatus, PostStatus } from "../model/posts.model"
import { Button, ScrollView, StyleSheet, Text, View, } from "react-native";
import { Image as Image1} from "react-native" ;
import FontAwesome from '@expo/vector-icons/FontAwesome';
import IconButton from "./IconButton";
import TagButton from "./Tag";

export const ITEM_HEIGHT = 400;
export const ITEM_PADDING = 10;

export interface PostItemProps {
    question: Question;
    onDelete: PostListener;
    onEdit: PostListener;
    onFilter: TagListener;
    onFav: PostListener;
    filterTags: string[];
}


export interface PostItemListener {
    (question: Question, postItemComponent: Component<PostItemProps, {}>): void;
}

export default class PostItem extends Component<PostItemProps, {}> {

    // handleTag = (tag: string) => {
    //     console.log(tag)
    // }
    render() {
        const { question, onDelete, onEdit, onFav, onFilter, filterTags}: PostItemProps = this.props;
        return (
            <View style={styles.itemContainer}>
                <View style={styles.postItem}>
                    <View style={styles.postHeader}>
                        <View style={styles.postContent} >
                            <Text style={styles.title}> Question : {question.text} </Text>
                            <Text>Answers:</Text>
                            {question.answers.map(tag => <TagButton style1 = {styles.postTags} style2 = {styles.postTag} tags = {[tag]} onPress={() => console.log(1)} filterTags={filterTags}
                            onFilter={onFilter}/>)}
                        </View>
                        <Image1 resizeMode='contain' style={styles.postImage} source={{ uri: question.picture?.uri }}></Image1>
                    </View>
                    <View style={styles.postItemButtons}>
                        <IconButton style={styles.button} textStyle={styles.buttonText} name="pencil-square" size={27} color="white" backgroundColor='green'
                            onPress={() => onEdit(question)}>Edit
                        </IconButton>

                        <View style={{ width: 20, backgroundColor: 'transparent' }} />
                        <IconButton style={styles.button} textStyle={styles.buttonText} name="times-circle" size={27} color="white" backgroundColor='#ff4466'
                            onPress={() => onDelete(question)}>Delete
                        </IconButton>
                    </View>
                </View >
            </View >
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: ITEM_PADDING,
        height: ITEM_HEIGHT,
    },
    postItem: {
        padding: 5,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#aaa',
        height: ITEM_HEIGHT - 2 * ITEM_PADDING,
    },
    postHeader: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        gap: 15,
    },
    postImage: {
        width: '30%',
        height: 'auto',
        borderRadius: 10,
        marginRight: 10,
    },
    postContent: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    postMetadata: {
        fontSize: 18,
        fontStyle: 'italic',
    },
    postTags: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    postTag: {
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#fccb58',
        borderRadius: 15,
        borderColor: 'green',
    },
    textScrollView:{
        height: ITEM_HEIGHT * 2 / 3,
        marginTop: 5,
        marginBottom: 10,
    },
    postText: {
        width: '100%',
        fontSize: 18,
    },
    postItemId: {
        paddingRight: 10,
        fontSize: 24,
    },
    postItemButtons: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 0,
        backgroundImage: 'gray',
        border: 1
    },
    button: {
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    buttonText: {
        padding: 0,
    },
    card: {
        padding: 10,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        width: 280,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#C4D7E0",
    },

    btnContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 40,
        marginTop: 20,
    },

});