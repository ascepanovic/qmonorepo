import { ReactNode } from "react";

export type ModalProps = {
  visible: boolean;
  setVisibility: (value: boolean) => void;
  title: ReactNode;
  body: ReactNode;
  submitHandler?: () => void;
  submitText?: ReactNode;
};

export const Modal = ({
  visible,
  setVisibility,
  title,
  body,
  submitHandler,
  submitText,
}: ModalProps) => {
  return (
    <>
      <div
        className={`fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none focus:outline-none ${
          visible ? "" : "hidden"
        }`}
      >
        <div className="mx-auto my-6 w-96 rounded-lg bg-main-bg shadow-[0_0_20px_10px_#2AE78B]">
          {/*content*/}
          <div className="bg-white  flex w-full flex-col rounded-lg border-0 shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-main p-5 px-10">
              <h3 className="text-2xl ">{title}</h3>
              <button
                className="border-1
                    float-right  text-2xl  transition-colors ease-in-out  hover:text-main"
                onClick={() => setVisibility(false)}
              >
                X
              </button>
            </div>
            {/*body*/}
            <div className="flex-auto p-6">{body}</div>
            {/*footer*/}
            <div className="flex items-center justify-between rounded-b border-t border-solid border-main p-6">
              <button
                className="text-red-500 background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase outline-none transition-all duration-150 ease-linear hover:text-main focus:outline-none"
                type="button"
                onClick={() => setVisibility(false)}
              >
                Close
              </button>
              {submitHandler ? (
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 mb-1 mr-1 rounded px-6 py-3 text-sm font-bold uppercase shadow outline-none transition-all duration-150 ease-linear hover:text-main hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={submitHandler}
                >
                  {submitText || "Submit"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => setVisibility(false)}
        className={`fixed inset-0 z-40 bg-[#000000]  transition-opacity ease-in-out ${
          visible ? "opacity-50" : "hidden opacity-0"
        }`}
      ></div>
    </>
  );
};
