import { forwardRef } from "react";

const QuillToolBar = forwardRef<HTMLDivElement, {}>(({}, toolbarRef) => (
  <footer
    ref={toolbarRef}
    className="px-7.5 pt-2.5 pb-3 lg:px-5 lg:py-2.5 flex flex-col lg:flex-row gap-x-5 gap-y-2.5 items-center max-w-full self-end mt-2.5 rounded-[40px] lg:rounded-full"
  >
    <select className="ql-header" defaultValue="0">
      <option value="0"></option>
      <option value="1"></option>
      <option value="2"></option>
      <option value="3"></option>
    </select>
    <div className="flex items-center gap-5">
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-link"></button>
    </div>
  </footer>
));

export default QuillToolBar;
