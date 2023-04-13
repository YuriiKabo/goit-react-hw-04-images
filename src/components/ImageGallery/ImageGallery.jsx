import { useEffect, useState } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { getImages } from '../../axiosImages';
import { ButtonLoadMore } from 'components/Button/Button';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Modal } from '../Modal/Modal';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';

const ImageGallery = ({ searchText }) => {
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isModal, setIsModal] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setGallery([]);
    setSearch(searchText);
  }, [searchText]);

  useEffect(() => {
    if (search !== '') {
      setIsLoading(true);
      setIsLoadMore(false);
      getImages(search, page)
        .then(response => {
          if (response.length !== 0) {
            setIsLoading(false);
            setIsLoadMore(true);
            setGallery([...gallery, ...response]);
          } else if (response.length === 0) {
            Report.failure('No more images to load', 'Okay');
            setIsLoadMore(false);
          }
        })
        .catch(error => {
          console.log('error :>> ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [page, search]);

  const handleModal = largeImageURL => {
    setIsModal(largeImageURL);
  };

  const closeModal = () => {
    setIsModal('');
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      {!gallery.length && !isLoading && (
        <h1 className="messageTitle">⬆️ Enter Request ⬆️</h1>
      )}
      <ul className="ImageGallery">
        {gallery.map(({ webformatURL, tags, id, largeImageURL }) => {
          return (
            <ImageGalleryItem
              id={id}
              link={webformatURL}
              title={tags}
              key={id}
              largeImage={largeImageURL}
              handleModal={handleModal}
            />
          );
        })}
      </ul>
      {isLoading && (
        <div className="spinner">
          <Loader />
        </div>
      )}
      {isLoadMore && <ButtonLoadMore loadMore={loadMore} />}
      {isModal && <Modal largeImage={isModal} closeModal={closeModal} />}
    </>
  );
};

export { ImageGallery };

ImageGallery.propTypes = {
  searchText: PropTypes.string.isRequired,
};
