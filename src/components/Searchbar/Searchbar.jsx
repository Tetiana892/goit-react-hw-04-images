import { useState } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const formSubmite = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.warn('🦄 Please specify your query!');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={formSubmite}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={e => setQuery(e.currentTarget.value)}
        />
      </SearchForm>
    </SearchbarHeader>
  );
}
