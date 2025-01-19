import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from 'react-modal';



const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value (0.5) for more visibility
    }, content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        color: 'white', // Text color inside the modal
        backgroundColor: '#1f2937', // Background color of the modal
        minWidth: '340px', // Set the width you want
        // height: '400px', // Set the height you want

    },
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


function ModalComponent() {

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    // function to triger open modal
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div>
            <h1>Modal</h1>
            <pre className="text-white font-bold" >npm i react-modal</pre>
            <a href="https://www.npmjs.com/package/react-modal#api-documentation">
                official docs
            </a>


            <div>
                <button
                    onClick={openModal}
                    className="mt-6 w-24 flex justify-center ml-4 items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                    <FaRegTrashAlt className="mr-2 " />
                    Toggle Modal
                </button>

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    className={""}
                >
                    <div className="content  m-1 flex justify-center items-center flex-col">
                        <FaRegTrashAlt className=' h-24 flex justify-center text-red-600 text-4xl' />
                        <div className='text-3xl font-bold'>Are you sure ?</div>

                        <div className="buttons flex mt-5">
                            <button
                                onClick={closeModal}
                                className="w-24 flex justify-center ml-4 items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
                                Cencel
                            </button>
                            <button
                                className=" w-24 flex justify-center ml-4 items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                                Delete
                            </button>
                        </div>
                    </div>

                </Modal>
            </div>
        </div>
    )
}

export default ModalComponent
