import { useMemo } from "react";

/*  const sortedPosts = useMemo(() => {
   //console.log("sortedPosts");
   if (filter.sort) {
     return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
   }
   return posts;
 }, [filter.sort, posts]);
теперь в константе sortedPosts у нас лежит еще один массив отсортированый,  и при этом массив пост никак не изменяется. на  основании этого отсортированного массива мы можем делать поиск
 */

export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

/*  const sortrdAndSearchedPosts = useMemo(() => {
   return sortedPosts.filter((post) => post.title.toLowerCase().includes(filter.query));
 }, [filter.query, sortedPosts]); */

export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()));
  }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
};

/*
кастомные пользовательские хуки - это хуки, который внутри себя используют
стандартные react hooks такие как useState, useMemo i td

*/
