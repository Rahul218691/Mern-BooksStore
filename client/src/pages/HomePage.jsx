import React from 'react'
import './styles/HomePage.css';
import {Carousal,Genres,EditorChoice,Trending,Popular,Footer,HomeBlog} from '../components';
import {Link} from 'react-router-dom';

const HomePage = () => {
    return (
    <div className="homepage__container">
     	<Carousal />
     	<section className="container homepage__section">
     		<p>BROWSE GENRES <Link to='#'>(view all)</Link></p>
     		<Genres />
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
            <HomeBlog />
        </section>
        <Footer />
    </div>
    )
}

export default HomePage
