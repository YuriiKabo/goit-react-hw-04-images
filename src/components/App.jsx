import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [searchWorld, setSearchWorld] = useState('');

  const searchbarSubmit = world => {
    setSearchWorld(world);
  };
  return (
    <>
      <Searchbar onSubmitForm={searchbarSubmit} />
      <ImageGallery searchText={searchWorld}></ImageGallery>
    </>
  );
};
