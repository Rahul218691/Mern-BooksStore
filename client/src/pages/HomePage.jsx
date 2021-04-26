import React,{useEffect} from 'react'
import './styles/HomePage.css';
import {Carousal,Genres,EditorChoice,Trending,Popular,Footer,HomeBlog} from '../components';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {fetchFiles} from '../actions/carousalActions';
import {fetchGenres} from '../actions/genreActions';
import {fetchBlogs} from '../actions/blogActions';

const HomePage = () => {

    const dispatch = useDispatch();
    const {loading,carousal} = useSelector(state=>state.admincarousal);
    const {loading:{genreloading},genres} = useSelector(state=>state.genresList);
    const {blogs} = useSelector(state=>state.blogs)

    useEffect(() => {
        dispatch(fetchFiles())
        dispatch(fetchGenres(1))
        dispatch(fetchBlogs(1,5))
    }, [dispatch])

    return (
    <div className="homepage__container">
     	<Carousal loading={loading} carousal={carousal}/>
     	<section className="container homepage__section">
     		<p>BROWSE GENRES <Link to='#'>(view all)</Link></p>
     		<Genres loading={genreloading} genres={genres}/>
     	</section>
     	<section className="container homepage__editorChoice">
     		<p>EDITOR'S CHOICE <Link to='#'>(view all)</Link></p>
            <EditorChoice />
     	</section>
        <section className="container homepage__trending">
            <p>TRENDING BOOKS <Link to='#'>(view all)</Link></p>
            <Trending />
        </section>
        <section className="container homepage__popular">
            <p>POPULAR CLASSICS <Link to='#'>(view all)</Link></p>
            <Popular />
        </section>
        <section className="container homepage__blog">
            <p>FROM THE BLOG <Link to='#'>(view all)</Link></p>
            <HomeBlog blogs={blogs}/>
        </section>
        <Footer />
    </div>
    )
}

export default HomePage
