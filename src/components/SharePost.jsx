import React, { useState, useRef } from "react";
import Modal from "react-modal";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  RedditIcon,
} from "react-share";

Modal.setAppElement("#root");

function SharePost({ openBtnClasses, closeBtnClasses, postLink, postTitle }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const inputRef = useRef();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(inputRef.current.value)
      .then(() => {
        // Successful copy
        inputRef.current.select();
      })
      .catch((err) => {
        // Failed to copy
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="flex justify-end">
      <button onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
          className="text-gray-600 dark:text-neutral-300"
        >
          <path
            fill="currentColor"
            d="M20.237 15.638h-.003a4.04 4.04 0 0 0-3.004 1.334l-.003.004l-8.948-4.348c0-.167.084-.418.084-.669a1.425 1.425 0 0 0-.087-.595l.003.01l8.948-4.348a4.04 4.04 0 0 0 3.007 1.338h.004a4.181 4.181 0 1 0-4.181-4.181a1.425 1.425 0 0 0 .087.595l-.003-.01l-8.948 4.348a4.04 4.04 0 0 0-3.007-1.338h-.004a4.181 4.181 0 0 0 0 8.362h.003a4.04 4.04 0 0 0 3.004-1.334l.003-.004l8.948 4.348c0 .167-.084.418-.084.669a4.181 4.181 0 1 0 8.363-.092a4.09 4.09 0 0 0-4.09-4.09l-.097.001z"
          ></path>
        </svg>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Share Post"
        className={
          " min-h-screen overflow-hidden overflow-y-hidden bg-transparent flex items-center justify-center"
        }
        overlayClassName="fixed inset-0 bg-transparent"
      >
        <div className=" w-full mx-4 p-4 rounded-xl md:w-1/2 lg:w-1/3 text-gray-800 dark:text-neutral-200 dark:bg-dark-bg bg-gray-200 border border-gray-200">
          {/* <!--MODAL HEADER--> */}
          <div className="flex justify-between items center border-b border-gray-200 py-3">
            <div className="flex items-center justify-center ">
              <p className="text-xl font-bold text-gray-800 dark:text-neutral-50">
                Share this Post
              </p>
            </div>

            <div
              itemType="button"
              onClick={closeModal}
              className="bg-gray-300  text-xl hover:bg-gray-500 cursor-pointer hover:text-gray-300 dark:hover:text-gray-100 font-sans text-black w-8 h-8 flex items-center justify-center rounded-full"
            >
              X
            </div>
          </div>

          {/* <!--MODAL BODY--> */}
          <div className="my-4">
            <p className="text-sm">Share this link via</p>

            <div className="flex justify-around my-4">
              {/* <!--FACEBOOK ICON--> */}
              <FacebookShareButton
                url={postLink}
                hashtag="#blog #BlogApp #Community"
              >
                <div className="border hover:bg-[#1877f2] w-12 h-12 fill-[#1877f2] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-blue-500/50 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </div>
              </FacebookShareButton>
              {/* <!--TWITTER ICON--> */}
              <TwitterShareButton url={postLink} title={postTitle}>
                <div className="border hover:bg-[#1d9bf0] w-12 h-12 fill-[#1d9bf0] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                  </svg>
                </div>
              </TwitterShareButton>
              {/* <!--INSTAGRAM ICON--> */}
              <RedditShareButton url={postLink} title={postTitle}>
                <div className="border hover:bg-orange-50 w-12 h-12 fill-[#bc2a8d] hover:fill-white border-pink-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-orange-300 cursor-pointer">
                  <RedditIcon className="h-7 w-7" fill="" round />
                </div>
              </RedditShareButton>

              {/* <!--WHATSAPP ICON--> */}
              <WhatsappShareButton url={postLink} title={postTitle}>
                <div className="border hover:bg-[#25D366] w-12 h-12 fill-[#25D366] hover:fill-white border-green-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-green-500/50 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
                    ></path>
                  </svg>
                </div>
              </WhatsappShareButton>

              {/* <!--TELEGRAM ICON--> */}
              <TelegramShareButton url={postLink} title={postTitle}>
                <div className="border hover:bg-[#229ED9] w-12 h-12 fill-[#229ED9] hover:fill-white border-sky-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
                  </svg>
                </div>
              </TelegramShareButton>
            </div>

            <p className="text-sm">Or copy link</p>
            {/* <!--BOX LINK--> */}
            <div className="border-2 border-gray-200 flex justify-between items-center mt-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-gray-500 ml-2"
              >
                <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
              </svg>

              <input
                ref={inputRef}
                className="w-full outline-none bg-transparent"
                type="text"
                placeholder="link"
                value={postLink || "blogapp.com"}
              />

              <button
                onClick={handleCopy}
                className="bg-indigo-500 text-white rounded text-sm py-2 px-5 mr-2 hover:bg-indigo-600"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </Modal>
    </div>
  );
}

export default SharePost;
