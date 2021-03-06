/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Pagination as Paginate } from 'reactstrap';
import PropTypes from 'prop-types';
import { usePageContext } from '../../../shared/PageProvider';
import Item from './Item';
import { handlePages } from './pageUtils';
import useStateCallback from '../useStateCallback';

const Pagination = ({ totalItems }) => {
  const { itemsPerPage, currentPage, setPage } = usePageContext();
  const pages = Math.ceil(totalItems / itemsPerPage);
  const pagesPerList = 3;
  const totalLists = Math.ceil(pages / pagesPerList);
  const [pageList, setPageList] = useStateCallback(0);

  const handlePageNav = (event, page, pagelist) => {
    event.preventDefault();
    if (pagelist >= 0) {
      setPageList(pagelist, setPage(page));
    } else if (page !== currentPage) {
      setPage(page);
    }
  };

  return (
    <Paginate aria-label="Relays" className="align-center mt-5 text-center">
      {handlePages(handlePageNav, pagesPerList, pageList, currentPage, pages, totalLists)
        .map((props, index) => <Item key={index} {...props} />)}
    </Paginate>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
};

export default Pagination;
