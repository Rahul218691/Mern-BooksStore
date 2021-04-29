import React,{useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useDropzone} from 'react-dropzone';
import {useDispatch,useSelector} from 'react-redux';
import {uploadBook,uploadPdffile} from '../../actions/bookActions';
import {fetchAuthorsNames} from '../../actions/authorActions';
import {fetchGenresNames} from '../../actions/genreActions';
import Select from 'react-select';

const BookModal = ({show,handleClose,open,handleHide,id}) => {

	const dispatch = useDispatch();
	const {authorList} = useSelector(state=>state.authorNames);
	const {genrelist} = useSelector(state=>state.genresList);

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [author, setAuthor] = useState('')
	const [genre, setGenre] = useState('');
	const [choice, setChoice] = useState(false);
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const [tags, setTags] = useState([]);
	const [pdf, setPDF] = useState(null)

	const handleChange = (e,editor) =>{
 		const data = editor.getData();
 		setContent(data)
 	}

	const {getInputProps,getRootProps,isDragActive} = useDropzone({
		accept: 'image/jpeg, image/png, image/jpg',
		maxFiles:1,
		maxSize:5242880,
		onDrop:(acceptedFiles) =>{
			setImage(acceptedFiles[0]);
			setPreview(URL.createObjectURL(acceptedFiles[0]))
		}
	});

	const handleTagChange = (options) =>{
		setTags(options);
	}

	useEffect(() => {
		dispatch(fetchAuthorsNames());
		dispatch(fetchGenresNames());
	}, [dispatch])

	const handleSubmit = () =>{
		const formdata = new FormData();
		const tagsList = tags.map((tag) =>{
			return tag.value;
		})
		formdata.append('booktitle',title);
		formdata.append('bookauthor',author);
		formdata.append('bookdescription',content);
		formdata.append('editorsChoice',choice);
		formdata.append('genre',genre);
		formdata.append('evobook',image);
		formdata.append('tags',tagsList);
		dispatch(uploadBook(formdata));
		setImage(null);
		setPreview(null);
		setChoice(false);
		setTitle('');
		setContent('');
		setAuthor('');
		setGenre('');
		setTags([]);
		handleClose();
	}

	const newGenreObj = genrelist && genrelist.map((list) =>{
		return{
			value:list.genreSlug,
			label:list.title
		}
	});

	const handleFileUpload = () =>{
		const formdata1 = new FormData();
		formdata1.append('id',id);
		formdata1.append('bookpdf',pdf);
		dispatch(uploadPdffile(formdata1))
		handleHide();
	}
		
	return (
		<>
			<Modal show={show} onHide={handleClose}  
			     backdrop="static"
		        keyboard={false}>
			        <Modal.Header closeButton>
			          <Modal.Title>Upload Books</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>
			        	<div className="form-group">
			        		<label>Book Title</label>
			        		<input className="form-control"
			        		type="text" placeholder="book title"
			        		value={title}
			        		onChange={(e)=>setTitle(e.target.value)}/>
			        	</div>
			        	<div className="form-group">
			        		<label>Book Description</label>
							<CKEditor editor={ClassicEditor}
            				data={content}
            				onChange={handleChange}/>
			        	</div>
			        	<div className="form-group">
			        		<label>Author</label>
			        		<select className="form-control" value={author}
			        		 onChange={(e)=>setAuthor(e.target.value)}>
			        		 <option value="">Choose Author</option>
            				{
            					authorList && authorList.map((author,i) =>(
            							<option key={i} value={author._id}>{author.name}</option>
            						))
            				}
			        		</select>
			        	</div>
			        	<div className="form-group">
			        		<label>Genre</label>
			        		<select className="form-control" value={genre}
			        		 onChange={(e)=>setGenre(e.target.value)}>
			        		  <option value="">Choose Genre</option>
            				{
            					genrelist && genrelist.map((genre,i) =>(
            							<option key={i} value={genre._id}>{genre.title}</option>
            						))
            				}
			        		</select>
			        	</div>	
			        	<div className="form-group">
			        		<label>Tags</label>
			        		<Select isMulti value={tags}
			        		onChange={handleTagChange}
			        		name="tags"
			        		className="basic-multi-select"
			        		classNamePrefix="select"
			        		options={newGenreObj}/>
			        	</div>
		        		 <div className="form-check">
						  <input className="form-check-input" type="checkbox" value={choice}
						  onChange={(e)=>setChoice(e.target.checked)}
						  id="defaultCheck1" />
						  <label className="form-check-label" htmlFor="defaultCheck1">
						    Editor's Choice
						  </label>
						</div> 
 						<label>Book Image</label>
            			<div {...getRootProps({className: 'dropzone'})}>
            				<input {...getInputProps()} />
            				{
            					isDragActive ? <p>Drop Book Image Here...</p> : <p>Drag and Drop image here || click to choose file</p>
            				}
            			</div>
            			{
            				preview && (
            					<>
            					<p className="text-muted mb-0">Preview Image:</p>
            					<img src={preview} width='300px' alt="" className="img-fluid"/>
            					</>
            				)
            			}
			        </Modal.Body>
			        <Modal.Footer>
			          <Button variant="secondary" onClick={handleClose}>
			            Close
			          </Button>
			          <Button variant="primary" onClick={handleSubmit}>
			            Submit
			          </Button>
			        </Modal.Footer>
			</Modal>

			<Modal show={open} onHide={handleHide}
		            backdrop="static"
	        		keyboard={false}>
		        <Modal.Header closeButton>
		          <Modal.Title>Upload BookPDF</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		        	<div className="form-group">
		        		<label>Choose File</label>
		        		<input type="file" 
		        		className="form-control"
		        		onChange={(e)=>setPDF(e.target.files[0])} accept="application/pdf" required/>
		        	</div>
		        </Modal.Body>
		        <Modal.Footer>
		          <Button variant="secondary" onClick={handleHide}>
		            Close
		          </Button>
		          <Button variant="primary" onClick={handleFileUpload}>
		            Submit
		          </Button>
		        </Modal.Footer>
		    </Modal>
		</>	
	)
}

export default BookModal