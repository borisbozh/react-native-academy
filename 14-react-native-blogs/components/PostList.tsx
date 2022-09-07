import { Component, ForwardedRef, forwardRef, useEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { FilterType, PostListener, TagListener } from "../model/shared-types";
import { Question } from "../model/posts.model";
import PostItem, { ITEM_HEIGHT, PostItemListener } from "./PostItem";

interface Props {
    questons: Question[];
    filter: FilterType;
    scrollIndex?: number;
    onDelete: PostListener;
    onEdit: PostListener;
    onFav: PostListener;
    onFilter: TagListener;
    filterTags: string[];
}

const PostList = forwardRef<FlatList<Question>, Props>((props, fRef) => {
    const [selectedTag, setSelectedTag] = useState('');

   

    const { questons, filter, scrollIndex,filterTags, ...rest }: Props = props;
    const visiblePosts = (questons: Question[], filter: string[]) => questons.filter(question =>{
        return true;
    })
    const memoizedVisiblePosts = useMemo(() => visiblePosts(questons, filterTags), [questons, filterTags]);
    return (
        <FlatList<Question> ref={fRef} style={{ flex:1, width: '100%' }} data={memoizedVisiblePosts}
            renderItem={({ item: question }) => <PostItem question={question} key={question.id}  filterTags={filterTags}  {...rest} />}
            // initialScrollIndex={scrollIndex}
            removeClippedSubviews={false}
            getItemLayout={(data: Question[] | null | undefined, index: number) => (
                { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
            ItemSeparatorComponent={ () => <View style={ { width:"100%", height: .7, backgroundColor: 'rgba( 52,52,52,1)' } } /> }
        />);
});

export default PostList;
