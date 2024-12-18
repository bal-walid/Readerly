import { useState, useRef } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import UpdateIcon from '@mui/icons-material/Update';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const BookStatusDropdown = () => {
  const statuses = [
    { label: "Completed", icon: <TaskAltIcon />, color: "#388E3C" },
    { label: "Currently Reading", icon: <BookmarksIcon />, color: "#1976D2" },
    { label: "To Be Read", icon: <UpdateIcon />, color: "#B0BEC5" },
    { label: "Did Not Finish", icon: <CancelOutlinedIcon />, color: "#D32F2F" },
  ];

  const [selectedOption, setSelectedOption] = useState(statuses[0]);

  // Use a ref to directly reference the select element
  const selectRef = useRef(null);

  const handleStatusChange = (event) => {
    const selectedStatus = statuses.find(status => status.label === event.target.value);
    setSelectedOption(selectedStatus);
  };

  const handleDivClick = () => {
    // Trigger the select dropdown to open when clicking on the div or icon
    selectRef.current.showPicker();
  };

  return (
    <div
      className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-btn-shadow cursor-pointer"
      onClick={handleDivClick} // Trigger the select focus on div click
    >
      {/* Icon next to the select */}
      <div className="flex items-center" style={{ color: selectedOption.color }}>
        {selectedOption.icon}
      </div>

      {/* Select dropdown */}
      <select
        ref={selectRef}
        value={selectedOption.label}
        onChange={handleStatusChange}
        className="focus:outline-none" // Remove outline on focus
        style={{ color: selectedOption.color }}
      >
        {statuses.map((status, index) => (
          <option key={index} value={status.label} style={{ color: status.color }}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BookStatusDropdown;
