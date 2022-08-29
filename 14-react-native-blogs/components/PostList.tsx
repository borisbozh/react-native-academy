import { Component, ForwardedRef, forwardRef, useMemo } from "react";
import { FlatList, View } from "react-native";
import { FilterType, PostListener, TagListener } from "../model/shared-types";
import { Post } from "../model/posts.model";
import PostItem, { ITEM_HEIGHT, PostItemListener } from "./PostItem";

interface Props {
    posts: Post[];
    filter: FilterType;
    scrollIndex?: number;
    onDelete: PostListener;
    onEdit: PostListener;
    onFilter: TagListener
}

const PostList = forwardRef<FlatList<Post>, Props>((props, fRef) => {

    let selectedTag = '';

    const handleFilter = (tag:string) =>{
        selectedTag = tag;
      } 

    const { posts, filter, scrollIndex, onFilter, ...rest }: Props = props;
    const visiblePosts = (posts: Post[], filter: FilterType) => selectedTag.length > 0 ? posts.filter(post => post.tags.includes(selectedTag)) : posts;
    const memoizedVisiblePosts = useMemo(() => visiblePosts(posts, filter), [posts, filter]);
    return (
        <FlatList<Post> ref={fRef} style={{ flex:1, width: '100%' }} data={memoizedVisiblePosts}
            renderItem={({ item: post }) => <PostItem post={post} key={post.id} onFilter={handleFilter} {...rest} />}
            // initialScrollIndex={scrollIndex}
            removeClippedSubviews={false}
            getItemLayout={(data: Post[] | null | undefined, index: number) => (
                { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
            ItemSeparatorComponent={ () => <View style={ { width:"100%", height: .7, backgroundColor: 'rgba( 52,52,52,1)' } } /> }
        />);
});

export default PostList;