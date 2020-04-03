import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

export default function Pagination(props) {
  const [pageNumber, setPageNumber] = useState(null);
  const pages = visiblePages(props.page, props.pages);
  const activePage = props.page + 1;

  if (props.pages <= 1) {
    return (<React.Fragment />);
  }

  return (
   <Grid container direction='row'>
     <Grid item xs={10}>
       <Grid container direction='row' className='table-pagination'>
         <Grid
           item xs={1}
           className='pagination-button page-number'
           onClick={() => {
             if (activePage === 1) {
               return;
             }
             changePage(activePage - 1, props);
             setPageNumber(activePage - 1);
           }}
           disabled={activePage === 1}
         >
           <span className='pre-button'></span>
         </Grid>
         <Grid
           item xs={10}
           className='page-numbers-container'>
           {showVisiblePages(pages, activePage, setPageNumber, props)}
         </Grid>
         <Grid
           item xs={1}
           className='pagination-button page-number'
           onClick={() => {
             if (activePage === props.pages) {
               return;
             }
             changePage(activePage + 1, props);
             setPageNumber(activePage + 1);
           }}
           disabled={activePage === props.pages}
         >
           <span className='next-button'></span>
         </Grid>
       </Grid>
     </Grid>
     <Grid item xs={2} className='go-to-page-container'>
       {goToPage(props, pageNumber, setPageNumber, t)}
     </Grid>
   </Grid>
  );
}

function goToPage(props, pageNumber, setPageNumber, t) {
  return (
    <Grid container direction='row' className='go-to-page-row'>
      <Grid item xs={8} className='go-to-page-text'>Go to page</Grid>
      <Grid item xs={2}
        className='go-to-page-input'
      >
        <input
          onInput={(e) => {
            setPageNumber(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && pageNumber >= 1 && pageNumber <= props.pages) {
              props.onPageChange(pageNumber - 1);
            }
          }}
        />
      </Grid>
      <Grid item xs={2}
        className='go-to-page-button'
        onClick={() => {
          if (pageNumber > props.pages) {
            return;
          }
          props.onPageChange(pageNumber - 1);
        }}
      >
        <span className='next-button'></span>
      </Grid>
    </Grid>
  );
}

function showVisiblePages(pages, activePage, setPageNumber, props) {
  return (
    <Grid container direction="row">
    {pages.map((page) => {
      return (
        <Grid
          item
          xs={1}
          key={page}
          disabled={activePage === page}
          className={
            page === 0
              ? 'invisible-pages'
            : activePage === page
              ? 'page-number-active'
              : 'page-number'
          }
          onClick={() => {
            changePage(page, props);
            setPageNumber(page);
          }}
        >
          {page === 0 ? '•••' : page}
        </Grid>
      );
    })}
    </Grid>
  );
}

function visiblePages(page, total) {
  if (total < 7) {
    const pages = [];
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  if (page + 1 > 3 && page < total - 6) {
    return [page, page + 1, page + 2, 0, total - 2, total - 1, total ];
  } else if (page >= total - 6) {
    return [0, total - 5, total - 4, total - 3, total - 2, total - 1, total ];
  }

  return [1, 2, 3, 0, total - 2, total - 1, total ];
}

function changePage(page, props) {
  const activePage = props.page + 1;

  if (page === activePage === 1) {
    return;
  }

  props.onPageChange(page - 1);
}
