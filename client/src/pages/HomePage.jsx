import React,{useEffect} from 'react'
import './styles/HomePage.css';
import {Carousal,Genres,EditorChoice,Trending,Popular,Footer,HomeBlog} from '../components';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {fetchFiles} from '../actions/carousalActions';
import {fetchGenres} from '../actions/genreActions';
import {fetchBlogs} from '../actions/blogActions';
import {fetchClassics,fetchEditorsChoice,fetchArrivals} from '../actions/bookActions';

const HomePage = () => {

    const dispatch = useDispatch();
    const {loading,carousal} = useSelector(state=>state.admincarousal);
    const {loading:{genreloading},genres} = useSelector(state=>state.genresList);
    const {blogs} = useSelector(state=>state.blogs)
    const {classics} = useSelector(state=>state.classicBooks);
    const {editorsbook} = useSelector(state=>state.editorBooks);
    const {newarrival} = useSelector(state=>state.newBooks);

    useEffect(() => {
        dispatch(fetchFiles())
        dispatch(fetchGenres(1))
        dispatch(fetchBlogs(1,5))
        dispatch(fetchClassics())
        dispatch(fetchEditorsChoice())
        dispatch(fetchArrivals());
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
            <EditorChoice editorsbook={editorsbook}/>
     	</section>
        <section className="container homepage__trending">
            <p>NEW ARRIVALS <Link to='#'>(view all)</Link></p>
            <Trending newarrival={newarrival}/>
        </section>
        <section className="container homepage__popular">
            <p>POPULAR CLASSICS <Link to='#'>(view all)</Link></p>
            <Popular classics={classics}/>
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
