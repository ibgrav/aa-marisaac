import { css } from "../../utils.tsx";

export const global = css`
  * {
    box-sizing: border-box;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    line-height: 1;
    font-size: inherit;
    font-weight: inherit;
  }

  a {
    display: block;
    text-decoration: none;
    color: inherit;
    position: relative;
  }

  button {
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
  }

  html {
    font-size: 16px;
    font-weight: 400;
  }

  body {
    font-family: "Playfair Display", serif;
    color: rgb(var(--c-vanilla));
    background-color: rgb(var(--c-drab));
    overflow-x: hidden;
    margin: 0.5em;
    padding: 0.5em;
    border-radius: 0.5em;
    min-height: calc(100vh - 1em);
    border: 2px solid rgb(var(--c-vanilla));
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    object-position: center;
    background-size: contain;
    background-position: center;
  }

  main {
    margin: 0 auto;
    max-width: 500px;
    padding-bottom: 4em;
  }

  #title {
    padding-bottom: 0.5em;
    margin: 0.5em 0.5em 1.5em 0.5em;
    font-size: 1.5em;
    text-align: center;
    border-bottom: 1px solid rgb(var(--c-vanilla));
  }
`;
