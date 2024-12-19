import { useState, useRef } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import UpdateIcon from "@mui/icons-material/Update";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AllInboxIcon from "@mui/icons-material/AllInbox";

const BookStatusDropdown = ({
  defaultValue,
  onStatusChange,
  filterDropdown = false,
  className
}) => {
  const statuses = [
    { label: "Completed", icon: <TaskAltIcon />, color: "#388E3C" },
    { label: "Currently Reading", icon: <BookmarksIcon />, color: "#1976D2" },
    { label: "To Be Read", icon: <UpdateIcon />, color: "#B0BEC5" },
    { label: "Did Not Finish", icon: <CancelOutlinedIcon />, color: "#D32F2F" },
  ];
  const allBooks = {
    label: "All Books",
    icon: <AllInboxIcon />,
    color: "gray",
  };

  const [selectedOption, setSelectedOption] = useState(
    filterDropdown
      ? allBooks
      : statuses.find((status) => status.label === defaultValue)
  );

  const selectRef = useRef(null);

  const handleStatusChange = async (event) => {
    const selectedStatus = statuses.find(
      (status) => status.label === event.target.value
    ) || allBooks;
    try {
      onStatusChange(selectedStatus.label);
      setSelectedOption(selectedStatus);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDivClick = () => {
    selectRef.current.showPicker();
  };

  return (
    <div
      className={className}
      onClick={handleDivClick} // Trigger the select focus on div click
    >
      {/* Icon next to the select */}
      <div
        className="flex items-center"
        style={{ color: selectedOption.color }}
      >
        {selectedOption.icon}
      </div>

      {/* Select dropdown */}
      <select
        ref={selectRef}
        value={selectedOption.label}
        onChange={handleStatusChange}
        onClick={(e) => e.stopPropagation()}
        className="focus:outline-none"
        style={{ color: selectedOption.color }}
      >
        {filterDropdown && <option>All Books</option>}
        {statuses.map((status, index) => (
          <option
            key={index}
            value={status.label}
            style={{ color: status.color }}
          >
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BookStatusDropdown;
