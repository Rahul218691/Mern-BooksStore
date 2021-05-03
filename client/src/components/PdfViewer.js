import React,{useState,useEffect,useRef} from 'react'
import './styles/PdfViewer.css';
import throttle from 'lodash/throttle';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const PdfViewer = () => {

	 const [numPages, setNumPages] = useState(null);
	 const [pdffile, setPdfFile] = useState(null)
 	 const [pageNumber, setPageNumber] = useState(1);
 	 const [initialWidth, setInitialWidth] = useState(null);
 	 const pdfWrapper = useRef();

	const isFirstPage = pageNumber === 1;
	const isLastPage = pageNumber === numPages; 	 

	 function onDocumentLoadSuccess({ numPages }) {
	 	setPageNumber(1)
	    setNumPages(numPages);
	 } 	

	const setPdfSize = () => {
	  if (pdfWrapper && pdfWrapper.current) {
	  	// console.log(pdfWrapper.current.getBoundingClientRect().width)
	    setInitialWidth(pdfWrapper.current.getBoundingClientRect().width - 15);
	  }
	};

	const firstPageClass = isFirstPage ? 'disabled' : 'clickable';
	const lastPageClass = isLastPage ? 'disabled' : 'clickable';


	const fastForward = () =>{
		setPageNumber(numPages)
	}

	const fastBackward = () =>{
		setPageNumber(1)
	}

	const prevPage = () =>{
		setPageNumber(pageNumber - 1)
	}

	const nextPage = () =>{
		setPageNumber(pageNumber + 1)
	}

	useEffect(() => {
		if(localStorage.getItem('file')){
			setPdfFile(localStorage.getItem('file'))
		}
	}, [])


	useEffect(() => {
	  window.addEventListener('resize', throttle(setPdfSize, 3000));
	  setPdfSize();
	  return () => {
	    window.removeEventListener('resize', throttle(setPdfSize, 3000));
	  };
	}, []);	 



	return (
		<div className="pdfreader">
			<div className="container mt-2 pdfreader__main" ref={pdfWrapper}>
		    	<Document
			        file={pdffile && pdffile}
			        onLoadSuccess={onDocumentLoadSuccess}
			        renderMode="svg"
			    >
				<Page pageNumber={pageNumber}  width={initialWidth} />
				</Document>
				<p className="text-center pageactions">
					<button className={`btn ${firstPageClass}`} onClick={()=>fastBackward()}><i className="fas fa-fast-backward"></i></button>
					<button className={`btn ${firstPageClass}`} onClick={()=>prevPage()}><i className="fas fa-backward"></i></button>
					Page {pageNumber} of {numPages}
					<button className={`btn ${lastPageClass}`} onClick={()=>nextPage()}><i className="fas fa-forward"></i></button>
					<button className={`btn ${lastPageClass}`} onClick={()=>fastForward()}><i className="fas fa-fast-forward"></i></button>
				</p>
			</div>
		</div>
	)
}

export default PdfViewer