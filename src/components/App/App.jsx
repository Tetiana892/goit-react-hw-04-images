import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import ScrollToTop from 'react-scroll-to-top';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Scroll from 'react-scroll';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import { fetchImage } from '../services/api';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  const searchValue = newQuery => {
    if (newQuery !== searchQuery) {
      setSearchQuery(newQuery);
      setPage(1);
      setImages([]);
    }
  };

  const LoadMore = () => setPage(prevPage => prevPage + 1);

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setModalImage(largeImageURL);
  };

  const errorString = () => {
    setImages([]);
    setStatus('rejected');
    setError(toast.warn('🦄 Please specify your query'));
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setStatus('pending');
    if (page === 1) {
      setImages([]);
    }
    fetchGallery();

    async function fetchGallery() {
      await fetchImage(searchQuery, page)
        .then(response => {
          setImages(prevImages => [...prevImages, ...response.hits]);
          setStatus('resolved');
          setTotalHits(response.totalHits);

          if (response.hits.length === 0) {
            setStatus('rejected');
            toast.error('🦄Sorry, no images found. Please, try again!');
            return;
          }

          if (page === 1) {
            toast.success(`🦄 Hooray! We found ${response.totalHits} images.`);
          }

          const totalPages = Math.ceil(response.totalHits / 12);

          if (page === totalPages) {
            toast.info("🦄 You've reached the end of search results.");
          }
          Scroll.animateScroll.scrollMore(300, { duration: 400 });
        })
        .catch(error => {
          setError(error.message);
          setStatus('rejected');
        });
    }
  }, [searchQuery, page]);

  return (
    <Container>
      <Searchbar onSubmit={searchValue} value={errorString} />

      {status !== 'idle' && images.length > 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}

      {status === 'resolved' && images.length !== totalHits && (
        <Button onClick={LoadMore} />
      )}

      {status === 'rejected' && (
        <h1 style={{ color: 'orangered', textAlign: 'center' }}>
          {error.message}
        </h1>
      )}

      {status === 'pending' && <Loader />}

      {showModal && <Modal image={modalImage} onClose={toggleModal} />}

      <ScrollToTop
        smooth
        width="20"
        height="20"
        color="white"
        style={{
          borderRadius: 50,
          backgroundColor: '#5b69ba',
          fontweight: 500,
        }}
      />
      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
    </Container>
  );
}
