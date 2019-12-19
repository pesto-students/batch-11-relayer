import {
  createPages,
  createFirstHandles,
  createLastHandles,
} from '../components/common/Pagination/pageUtils';

const handlePageNav = jest.fn();
const pagesPerList = 3;
const pageList = 1;
const currentPage = 1;
const pages = 20;
const totalLists = 7;

describe('createPages', () => {
  test('return an array with length of 5', () => {
    const returnedArray = createPages(handlePageNav, pagesPerList, pageList, currentPage, pages);
    expect(returnedArray).toHaveLength(5);
    expect(returnedArray).toBeInstanceOf(Object);
    expect(Array.isArray(returnedArray)).toBe(true);
  });
  test('returned array should contain objects', () => {
    const returnedArray = createPages(handlePageNav, pagesPerList, pageList, currentPage, pages);
    expect(returnedArray[0]).toHaveProperty('onClick');
    expect(returnedArray[0]).toHaveProperty('href');
    expect(returnedArray[0]).toHaveProperty('children');
  });
});

describe('createFirstHandles', () => {
  test('return an array with length of 2', () => {
    const returnedArray = createFirstHandles(handlePageNav, pageList, currentPage);
    expect(returnedArray).toHaveLength(2);
    expect(returnedArray).toBeInstanceOf(Object);
    expect(Array.isArray(returnedArray)).toBe(true);
  });
  test('returned array should contain objects', () => {
    const returnedArray = createFirstHandles(handlePageNav, pageList, currentPage);
    expect(returnedArray[0]).toHaveProperty('onClick');
    expect(returnedArray[0]).toHaveProperty('href');
    expect(returnedArray[0]).toHaveProperty('disabled');
  });
});

describe('createLastHandles', () => {
  test('return an array with length of 2', () => {
    const returnedArray = createLastHandles(
      handlePageNav, pagesPerList, pageList, currentPage, pages, totalLists,
    );
    expect(returnedArray).toHaveLength(2);
    expect(returnedArray).toBeInstanceOf(Object);
    expect(Array.isArray(returnedArray)).toBe(true);
  });
  test('returned array should contain objects', () => {
    const returnedArray = createLastHandles(
      handlePageNav, pagesPerList, pageList, currentPage, pages, totalLists,
    );
    expect(returnedArray[0]).toHaveProperty('onClick');
    expect(returnedArray[0]).toHaveProperty('href');
    expect(returnedArray[0]).toHaveProperty('disabled');
  });
});
