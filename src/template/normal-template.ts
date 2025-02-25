import { htmlParamTypes } from "./types";

export const normalHtmlTemplate = (params: htmlParamTypes) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html {
        scrollbar-width: none; /* Firefox */
      }

      body {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      }
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        height: 100vh;
        background: ${params.bg}
      }
      .content {
        content: url("${params.portrait}");
        position: relative;
        width: 100%;
      }
      .main {
        position: relative;
        width: 100%;
      }
      .btn-container {
        width: 100%;
        position: absolute;
        bottom: 2%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .btn-cta {
        content: url("${params.cta}");
        width: 50%;
      }
      .pulse-button {
        cursor: pointer;
        animation: pulse 1s infinite;
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }
      }
      @media (orientation: portrait) {
        body {
          height: 100vh;
        }
        .landscape {
          display: none;
        }
        .btn-container {
          display: none;
        }
        .btn-portrait {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      @media (orientation: landscape) {
        body {
          height: unset;
        }
        .main {
          display: none;
        }
        .btn-portrait {
          display: none;
        }
        .landscape {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          position: relative;
        }
        .content_landscape {
          content: url("${params.landscape}");
          position: relative;
          width: 100%;
        }
        .btn-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          bottom: 30%;
        }
        .btn-cta-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    </style>
  </head>
  <body onclick="mraid.open('')">
    <div class="main">
      <div class="content"></div>
      <div class="btn-container btn-portrait">
        <div class="btn-cta pulse-button"></div>
      </div>
    </div>
    <div class="landscape">
      <div class="content_landscape"></div>
      <div class="btn-container">
        <div></div>
        <div class="btn-cta-container">
          <div class="btn-cta pulse-button"></div>
        </div>
      </div>
    </div>
  </body>
</html>`;
};
