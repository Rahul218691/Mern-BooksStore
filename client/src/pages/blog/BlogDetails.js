import React from 'react'
import {Link} from 'react-router-dom';
import './styles/BlogDetails.css';
import {Footer} from '../../components';

const BlogDetails = () => {
	return (
		<>
		<div className="container-fluid">
			<div className="row mt-4 text-center">
				<div className="col-md-9">
					<div className="blogdetails__heading">
						<h2 className="text-muted ">Editorial Review: Generation 23: Hallowed Be Thy Noble Name by Ivan Ertlov</h2>
						<p>Posted on 15th of April, 2021 by <Link to='/author/heinrichbolton'>Heinrich Bolton</Link></p>
					</div>
					<div className="blogdetails__imgcontainer">
						<img className="img-fluid" src="https://manybooks.net/sites/default/files/styles/560x315sc/public/2021-04/generation23background.png?itok=Lr2J4_Id" alt=""/>
						<div className="blogdetails__icons">
							<span><i className="fab fa-twitter"></i></span>
							<span><i className="fab fa-facebook-f"></i></span>
							<span><i className="fab fa-instagram"></i></span>
							<span><i className="far fa-envelope"></i></span>
							<span><i className="fas fa-print"></i></span>
						</div>
					</div>
					<div className="blogdetails__description">
						<p>
							The search for a new home amongst the stars is not a
							new concept in science fiction, but Generation 23 
							deals with it in a refreshingly different way.
						</p>
						<p>
							Maria Gomez is a Justiciar aboard "Trappist," one of the colonial generation ships that were launched as Earth faced destruction.
							It has been 23 generations since it began its voyage and there are still many generations left before it will reach its destination.
				 			For the nobles, descendants of the billionaires who funded the construction of the ships, it is a peaceful and pleasurable journey.
						</p>
						<p>
							However, for the workforce, conditions on board the ship is a lot harsher. As a Justiciar, Maria is tasked with upholding law and order,
							a position of power that comes with more comfort and privilege than those who are not classified as noble or
							"indispensable." However, Maria finds her life turned upside down after a simple investigation into the theft of a chicken turns
							into something a lot more serious.
						</p>
						<p>
							Instead of the galaxy-spanning adventures favored by many other science fiction novels, Generation 23 is set entirely aboard one colony ship.
							It is a very fast-paced read and plays out from the perspective of Maria Gomez. She is a no-nonsense type of person who takes her job and her responsibilities very seriously,
							which makes it fascinating to observe her in action. Dealing with a chicken thief is just another day on the job for Maria,
							but much to her surprise it leads to a murder mystery as well as a far-reaching conspiracy.
						</p>
						<p>
							Generation 23 features plenty of action and intrigue it also has some interesting observations on the class division between the people aboard the ship.
							Life aboard the ship is presented in a realistic and plausible manner, so it's all the more harrowing to find out about the atrocities inflicted on the working class.
							While the nobles live a life of luxury and opulence, most of the workforce is just one misstep away from getting their organs harvested and ending up at the protein reprocessing plant.
							It is a system that has been in place for generations, so initially, Maria takes it all for granted and does her best to maintain the status quo. However,
							the deeper she digs during a murder investigation the more it becomes apparent that the ship holds more secrets than what she ever suspected.
						</p>
						<p>
							The author, Ivan Ertlov, has worked on international video game titles such as Gothic and SpellForce, and this really shows in Generation 23.
							The way he describes life aboard the ship and the interactions between the different classes feels plausible and realistic.
							The story also doesn't get bogged down with all kinds of unnecessary descriptions of wonderous sci-fi gadgets, which is all too common with the genre.
							Instead, Ertlov maintains a fast pace for the entire story, and events continue to escalate as the stakes become higher and higher.
							Some of the twists can be guessed ahead of time, but there are also some revelations that most readers won't see coming.
						</p>
						<p>
							Overall, Generation 23 is a well-paced and interesting science fiction thriller with a capable, yet likable protagonist.
							Due to her training and discipline, it never feels like she is ever in any serious peril, but towards the end of the book in particular the stakes are raised dramatically.
							The very human theme of this story will also make it appealing to more than just fans of science fiction.
						</p>
					</div>
				</div>
				<div className="col-md-3">
					<h4 className="similar__articles text-muted">POPULAR ARTICLES</h4>
					<div className="blogdetails__popular">
						<Link to='/blog/details/blog1'>
							<div className="blogdetails__popularImage">
								<img src="https://manybooks.net/sites/default/files/styles/560x315sc/public/2021-04/generation23background.png?itok=Lr2J4_Id" alt="" className="img-fluid"/>
							</div>
							<div>
								<p className="text-muted">Editorial Review: Generation 23: Hallowed Be Thy Noble Name by Ivan Ertlov</p>
							</div>
						</Link>
						<Link to='/blog/details/blog1'>
							<div className="blogdetails__popularImage">
								<img src="https://manybooks.net/sites/default/files/styles/560x315sc/public/old-article-files/fantasy-3077928_1280.jpg?itok=Y6eq-IDs" alt="" className="img-fluid"/>
							</div>
							<div>
								<p className="text-muted">Four Free Fantasy Short Story Collections</p>
							</div>
						</Link>
						<Link to='/blog/details/blog1'>
							<div className="blogdetails__popularImage">
								<img src="https://manybooks.net/sites/default/files/styles/560x315sc/public/2021-04/deaddontdrink.jpg?itok=KQX7JoDj" alt="" className="img-fluid"/>
							</div>
							<div>
								<p className="text-muted">Editorial Review: The Dead Don't Drink At Lafitte's by Seana Kelly</p>
							</div>
						</Link>
						<Link to='/blog/details/blog1'>
							<div className="blogdetails__popularImage">
								<img src="https://manybooks.net/sites/default/files/styles/560x315sc/public/2021-04/laststar32.jpg?itok=1sSSJYjv" alt="" className="img-fluid"/>
							</div>
							<div>
								<p className="text-muted">Editorial Review: Last Star Standing by Spaulding Taylor</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
		<Footer />
		</>
	)
}

export default BlogDetails