import{jsxs as _jsxs}from"react/jsx-runtime";import{useEffect}from"react";const SearchPage=({routeParams})=>{useEffect(()=>{document.title=`Has buscado ${routeParams.query}`},[]);return /*#__PURE__*/_jsxs("h1",{children:["Has buscado ",routeParams.query]})};export default SearchPage;