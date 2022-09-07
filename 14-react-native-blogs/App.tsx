import React, { Component } from "react";
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, KeyboardAvoidingView, Platform, FlatList } from "react-native";
import { BlogsAPI } from "./dao/rest-api-client";
import { FilterType, Optional } from "./model/shared-types";
import { Form } from "./components/formbuilder/Form";
import { Answer, ImageStatus, PostStatus, Question, QuestionType } from "./model/posts.model";
import PostList from "./components/PostList";
import { FormComponentConfigs } from "./components/formbuilder/form-types";
import IconButton from './components/IconButton';
import * as yup from 'yup';
import PostItem, { ITEM_HEIGHT, PostItemProps } from "./components/PostItem";

export enum Views {
  PostFormView = 1, PostListView
}

interface AppState {
  activeView: Views;
  errors: string | undefined;
  questions: Question[];
  filter: FilterType;
  editedPost: Question;
  scrollIndex: number;
  selectedTag: string[];
}
export const EMPTY_IMAGE_DATA = { uri: '', width: 0, height: 0 };
const EMPTY_POST = new Question(undefined, QuestionType.MultipleChoice , `` , 0, [], new Date, new Date, EMPTY_IMAGE_DATA);

class App extends Component<{}, AppState> {
  state: AppState = {
    activeView: Views.PostListView,
    errors: '',
    questions: [],
    filter: undefined,
    editedPost: EMPTY_POST,
    scrollIndex: 0,
    selectedTag: []
  }
  postsListRef = React.createRef<FlatList<Question>>()

  async componentDidMount() {
    try {
      const allPosts = await BlogsAPI.findAll();
      this.setState({ questions: allPosts, errors: undefined })
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<AppState>, snapshot?: any): void {
    if (this.state.activeView === Views.PostListView) {
      if (Platform.OS === 'web') {
        // this.postsListRef.current?.scrollToOffset({offset: (this.state.scrollIndex-1) * ITEM_HEIGHT - 1});
      } else {
        this.postsListRef.current?.scrollToIndex({ index: this.state.scrollIndex });
      }
    }
  }

  handleUpdatePost = (Question: Question) => {
    this.setState(({ questions }) => ({
      questions: questions.map(td => td.id === Question.id ? Question : td)
    }))
  }

  handleDeletePost = async (Question: Question) => {
    try {
      await BlogsAPI.deleteById(Question.id);
      this.setState(({ questions }) => ({
        questions: questions.filter(p => p.id !== Question.id),
        errors: undefined
      }));
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleSubmitPost = async (Question: Question) => {
    try {
      if (Question.id) { //edit Question
        const updated = await BlogsAPI.update(Question);
        const scrollIndex = this.state.questions.findIndex(p => p.id === updated.id)
        this.setState(({ questions }) => {
          const postsCopy = questions.slice();
          postsCopy[scrollIndex] = updated;
          return {
            questions: postsCopy,
            scrollIndex,
          }
        });
      } else { // create Question
        const created = await BlogsAPI.create(Question);
        const scrollIndex = this.state.questions.length;
        this.setState(({ questions }) => ({
          questions: questions.concat(created),
          scrollIndex,
        }));
      }
      this.setState({
        errors: undefined,
        editedPost: EMPTY_POST,
        activeView: Views.PostListView,
      });
    } catch (err) {
      this.setState({ errors: err as string })
    }
  }

  handleFormCancel = () => {
    this.setState({
      errors: undefined,
      editedPost: EMPTY_POST,
      activeView: Views.PostListView,
    })
  }

  handleFilter = (tags:string[]) =>{
   this.setState({selectedTag: tags})
  }

  handleEditTodo = (Question: Question) => {
    this.setState({ editedPost: Question, activeView: Views.PostFormView });
  }

  handlefilterChange = (status: FilterType) => {
    this.setState({ filter: status })
  }

  handleTagRemoval = (tags:string[]) =>{
    this.setState({selectedTag: []})
   }

   handleFav = (Question: Question) =>{
    Question.questionType=QuestionType.MultipleResponse
   }

  handleViewChange = () => {
    this.setState(({ activeView }) => ({
      activeView: activeView === Views.PostListView ? Views.PostFormView : Views.PostListView
    }));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="green" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboarAvoidingView}
        >
          <IconButton size={30} backgroundColor="green" color="white" onPress={this.handleViewChange} name='check-circle' >
            {this.state.activeView === Views.PostListView ? 'Add New Question' : 'Show All questions'}
          </IconButton>
          {(() => {
            switch (this.state.activeView) {
              case Views.PostFormView:
                return (
                  <Form<Question, PostFormPropToCompKindMapping>
                    config={postFormConfig}
                    // initialValue={new Question('Example Question', 'Example content ...', ['example', 'Question'], 'https://www.publicdomainpictures.net/pictures/160000/velka/jeune-femme-poste-de-travail.jpg', 1)}
                    initialValue={this.state.editedPost}
                    onSubmit={this.handleSubmitPost}
                    onCancel={this.handleFormCancel} />);
              case Views.PostListView:
                return (
                  <PostList ref={this.postsListRef} questons={this.state.questions}
                  filter={this.state.filter}
                  onDelete={this.handleDeletePost}
                  onEdit={this.handleEditTodo}
                  onFav={this.handleFav}
                  onFilter={this.handleFilter}
                  scrollIndex={this.state.scrollIndex} filterTags={this.state.selectedTag}                  />);
            }
          })()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default App;


type PostFormPropToCompKindMapping = {
  id: 'FormReadonlyTextComponent';
  questionType: 'FormDropdownComponent';
  text: 'FormTextComponent';
  picture: 'FormImageComponent';
  maxPoints: 'FormTextComponent';
  answers: 'FormAnswerComponent';
  created: Date,
  modified: Date
}

const postFormConfig: FormComponentConfigs<Question, PostFormPropToCompKindMapping> = {
  id: {
    componentKind: 'FormReadonlyTextComponent',
    label: 'ID',
  },
  questionType: {
    componentKind: 'FormDropdownComponent',
    label: 'Type',
    options: {
      choices: [
        { label: QuestionType[QuestionType.MultipleChoice], value: QuestionType.MultipleChoice },
        { label: QuestionType[QuestionType.MultipleResponse], value: QuestionType.MultipleResponse },
        { label: QuestionType[QuestionType.DragAndDrop], value: QuestionType.DragAndDrop }
      ]
    }
  },
  text: {
    label: 'QuestionText',
    options: {
      multiline: true,
    },
    validators: yup.string().min(15).max(2048),
  },
  picture: {
    componentKind: 'FormImageComponent',
    label: 'Image',
    validators: yup.object().shape({
      localUri: yup.string(),
      format: yup.string().oneOf(['jpeg', 'png', 'webp']),
      width: yup.number().integer().min(0),
      height: yup.number().integer().min(0)
    }),
  },
  maxPoints: {
    label: 'Max Points',
    validators: yup.number().min(1).max(100)
  },
  answers: {
    convertor: {
      fromString: (answers: string) => answers.split(/\W+/),
      toString: (AnswerArray: string[]) => AnswerArray.toString()
    }
  },
  created: {
    label: 'Created' + new Date().toDateString(),
  },
  modified: {
    label: 'Modified' + new Date().toDateString()
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  keyboarAvoidingView: {
    flex: 1
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 20,
    alignSelf: 'center',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  errors: {
    padding: 5,
    fontSize: 20,
    border: 1,
    borderRadius: 5,
    backgroundColor: '#eecccc',
    color: 'red',
    textAlign: 'center',
  }
});