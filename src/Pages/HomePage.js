import React, { useEffect, useState, useRef } from 'react';
import { FaSearch, FaMagic, FaPlusCircle, FaCheckCircle, FaCalendarAlt, FaBell, FaFileAlt, FaTh, FaEllipsisH, FaPaperclip, FaUserCircle, FaCog, FaSignOutAlt, FaTrash, FaGift, FaRegStickyNote } from 'react-icons/fa';
import '../Css/HomePage.css';
import logo from '../Images/logo.svg';
import md5 from 'md5';
import { FaBars, FaChevronLeft, FaFolder, FaShareAlt, FaSun, FaMoon, FaUserPlus } from 'react-icons/fa'; // Importing icons from Font Awesome
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaPaperPlane, FaMicrophone } from 'react-icons/fa';
import { FaPen, FaEraser, FaUndo, FaRedo, FaDownload, FaShare } from 'react-icons/fa';








// Function to get Gravatar URL based on email
const getGravatarUrl = (email) => {
  const emailHash = email ? email.trim().toLowerCase() : '';
  const hash = emailHash ? md5(emailHash) : '';
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};





const CustomNavbar = () => {
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState(''); // State to store email
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown visibility state
  const [note, setNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [menu, setMenu] = useState(false);
  const [isOpened, setIsOpened] = useState(true); // State to toggle the sidebar
  const [currentActivePage, setCurrentActivePage] = useState('workspace'); // State to track the active page
  const userNames = "Your Username"; // Replace with actual username or state
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState('light');
  const [theme, setTheme] = useState(false);
  const [selectedColor, setSelectedColor] = useState('blue'); // Default color
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);


  const canvasRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('pen');
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  // Initialize canvas context
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000000';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = 2;
      setContext(ctx);
    }
  }, []);

  // Save initial state after context is set
  useEffect(() => {
    if (context) {
      saveState();
    }
  }, [context]);

  const saveState = () => {
    if (canvasRef.current) {
      setHistory(prevHistory => [...prevHistory.slice(0, historyStep + 1), canvasRef.current.toDataURL()]);
      setHistoryStep(prevStep => prevStep + 1);
    }
  };

  const startDrawing = (e) => {
    if (!context) return;
    const { offsetX, offsetY } = getCoordinates(e);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !context) return;
    const { offsetX, offsetY } = getCoordinates(e);
    
    if (selectedTool === 'pen') {
      context.strokeStyle = '#000000';
      context.lineWidth = 2;
    } else if (selectedTool === 'eraser') {
      context.strokeStyle = '#FFFFFF';
      context.lineWidth = 20;
    }

    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing && context) {
      context.closePath();
      setIsDrawing(false);
      saveState();
    }
  };

  const getCoordinates = (e) => {
    if (!canvasRef.current) return { offsetX: 0, offsetY: 0 };
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if (e.touches) {
      return {
        offsetX: (e.touches[0].clientX - rect.left) * scaleX,
        offsetY: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      offsetX: (e.clientX - rect.left) * scaleX,
      offsetY: (e.clientY - rect.top) * scaleY
    };
  };

  const undo = () => {
    if (historyStep > 0 && context) {
      setHistoryStep(prevStep => prevStep - 1);
      const img = new Image();
      img.src = history[historyStep - 1];
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(img, 0, 0);
      };
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1 && context) {
      setHistoryStep(prevStep => prevStep + 1);
      const img = new Image();
      img.src = history[historyStep + 1];
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(img, 0, 0);
      };
    }
  };

  const exportCanvas = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'whiteboard.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const share = async () => {
    if (!canvasRef.current) return;
    
    try {
      const blob = await new Promise(resolve => canvasRef.current.toBlob(resolve));
      const file = new File([blob], 'whiteboard.png', { type: 'image/png' });
      await navigator.share({
        files: [file],
        title: 'Whiteboard Drawing'
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };





  // Available colors for the theme
  const colors = [
    { name: 'Purple', code: 'purple' },
    { name: 'Blue', code: 'blue' },
    { name: 'Pink', code: 'pink' },
    { name: 'Violet', code: 'violet' },
    { name: 'Indigo', code: 'indigo' },
    { name: 'Orange', code: 'orange' },
    { name: 'Teal', code: 'teal' },
    { name: 'Bronze', code: 'bronze' },
    { name: 'Black', code: 'black' },
    { name: 'Mint', code: 'mint' }
  ];

  const handleTheme = () => {
    setDropdownOpen(false);
    setTheme(!theme);
  }

  const modalRef = useRef(null);

  // Function to close the theme modal
  const closeThemeModal = () => {
    setTheme(false); // Set theme state to false to close the modal
  };

  // Handle click outside the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeThemeModal(); // Close modal when clicking outside
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts or modal closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])



  const handleLogout = () => {
    setDropdownOpen(false);  // Close the dropdown if it’s open
    navigate('/');     // Redirect to signup page
  };

  const toggleDashboard = () => setIsOpen(prev => !prev); // Toggle the sidebar

  // New setter function for setting active page
  const handleSetActivePage = (page) => {
    setCurrentActivePage(page);
  };

  // Function to render content based on the active page
  const renderContent = () => {
    switch (currentActivePage) {
      case 'workspace':
        return (
          <>
            <span style={{ fontSize: '22px', fontWeight: '400', color: '#333' }}>
              Hello, {userName}!
            </span>
            {/* Add workspace content here */}
          </>
        );
      case 'pages':
        return (
          <span style={{ fontSize: '22px', fontWeight: '400', color: '#333' }}>
            Pages Content Here
          </span>
        );
      default:
        return null;
    }
  };




  const dropdownRef = useRef(null);
  // Create a ref for the dropdown menu

  // Function to handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleOutsideClick);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  const noteRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setShowNoteInput(false); // Close the note if clicked outside
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleOutsideClick);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  const menuRef = useRef(null); // Create a ref for the menu container

  // Function to handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false); // Close the menu if clicked outside
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleOutsideClick);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(true);

  const [activePage, setActivePage] = useState('Task'); // Track the active page

  const pages = ['Task', 'Chat', 'Doc', 'Reminder', 'Whiteboard'];
  const handlePageClick = (page) => {
    setActivePage(page);
  };

  // Function to toggle the dashboard open/closed state


  useEffect(() => {
    // Retrieve the user's name and email from localStorage
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail'); // assuming email is stored with key 'userEmail'
    if (storedName) {
      setUserName(storedName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleOverlayClick = () => {
    setShowForm(false); // Close the form
  };
  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const toggleNote = () => {
    setShowNoteInput(!showNoteInput);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    // Handle note submission logic here
    console.log('Note submitted:', note);
    setNote(''); // Clear the note input
    setShowNoteInput(false); // Optionally close the note input after submission
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    console.log({ taskName, description });
    setShowForm(false);
  };

  const handleMenu = () => {
    setMenu(!menu)
  }


  const getFileType = (file) => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('application/pdf')) return 'pdf';
    if (file.type.startsWith('text/')) return 'text';
    return 'other';
  };

  // Update the handleFileAttachment function
  const handleFileAttachment = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = getFileType(file);
      const fileUrl = URL.createObjectURL(file);

      // For text files, read and store content
      let fileContent = null;
      if (fileType === 'text') {
        const text = await file.text();
        fileContent = text;
      }

      const newMessage = {
        id: Date.now(),
        type: 'file',
        fileType: fileType,
        fileName: file.name,
        fileSize: file.size,
        fileUrl: fileUrl,
        fileContent: fileContent,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...messages, newMessage]);
    }
  };

  // Handle voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const newMessage = {
          id: Date.now(),
          type: 'audio',
          audioUrl,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages([...messages, newMessage]);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Unable to access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Handle team member addition
  const handleAddTeamMember = () => {
    const memberEmail = prompt('Enter team member email:');
    if (memberEmail && memberEmail.trim()) {
      setTeamMembers([...teamMembers, {
        id: Date.now(),
        email: memberEmail,
        avatar: `https://www.gravatar.com/avatar/${md5(memberEmail)}?d=identicon`
      }]);
    }
  };

  // Add this function inside the ChatForm component, alongside other handlers
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (message.trim()) { // Only send if message isn't empty
      const newMessage = {
        id: Date.now(),
        type: 'text',
        text: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages([...messages, newMessage]); // Add new message to messages array
      setMessage(''); // Clear input field after sending
    }
  };
  



  return (
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="navbar-center">
          <div className="search-bar">
            <FaSearch className="icon" />
            <input type="text" placeholder="Search..." className="search-input" />
            <div className="ai-section">
              <FaMagic className="icon-ai" />
              <span>AI</span>
            </div>
          </div>
        </div>

        <div className="navbar-right">
          <div className="icon-group" onClick={toggleForm}>
            <FaPlusCircle className="icon-right" />
            <span>New</span>
          </div>
          <FaCheckCircle className="icon-right" />
          <FaCalendarAlt className="icon-right" onClick={toggleNote} />
          <FaBell className="icon-right" />
          <FaFileAlt className="icon-right" />
          <FaTh className="icon-right" onClick={handleMenu} />

          {/* Display Gravatar Instead of Profile Icon */}
          <div className="user-info" onClick={toggleDropdown}>
            {email ? (
              <div className="email-display">
                {/* Gravatar image based on email */}
                <img
                  src={getGravatarUrl(email)}
                  alt="Profile"
                  className="profile-icon"
                />
              </div>
            ) : (
              <FaUserCircle className="profile-icon" />
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div ref={dropdownRef} className="dropdown-menu">
          <ul>
            <li onClick={handleTheme}><FaCog /> Themes</li>
            <li onClick={() => setDropdownOpen(false)}><FaCog /> Settings</li>
            <li onClick={() => setDropdownOpen(false)}><FaBell /> Notification Settings</li>
            <li onClick={() => setDropdownOpen(false)}><FaGift /> Referrals</li>
            <li onClick={() => setDropdownOpen(false)}><FaCog /> Keyboard Shortcuts</li>
            <li onClick={() => setDropdownOpen(false)}><FaCog /> Download Apps</li>
            <li onClick={() => setDropdownOpen(false)}><FaCog /> Help</li>
            <li onClick={() => setDropdownOpen(false)}><FaTrash /> Trash</li>
            <li onClick={handleLogout}>
              <FaSignOutAlt /> Log Out
            </li>
          </ul>
        </div>
      )}

      {/* Display User's Name Below the Navbar */}
      <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', backgroundColor: '#f0f0f0' }}>
        {/* Dashboard content */}
        <div
          style={{
            width: isOpen ? '180px' : '50px', // Adjusted width for open/close
            transition: 'width 0.3s ease', // Smooth transition for width
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Enhanced shadow
            backgroundColor: '#ffffff', // Clean white background
            display: 'flex',
            flexDirection: 'column',
            alignItems: isOpen ? 'flex-start' : 'center',
            padding: '15px', // More padding for spacing
            borderRight: '1px solid #ddd', // Light border for separation
          }}
        >
          {/* Toggle icon */}
          <div
            onClick={toggleDashboard}
            style={{
              cursor: 'pointer',
              marginBottom: '30px',
              padding: '10px',
              fontSize: '24px', // Larger icon size
              backgroundColor: '#ffffff',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for the toggle
              transition: 'transform 0.3s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            title={isOpen ? 'Close Menu' : 'Open Menu'} // Tooltip for better UX
          >
            {isOpen ? <FaChevronLeft color="#ccc" fontSize="20px" /> : <FaBars color="#ccc" fontSize="20px" />}
          </div>

          {/* Workspace */}
          <div
            onClick={() => handleSetActivePage('workspace')} // Using new setter function
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '10px',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
              borderRadius: '5px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <FaFolder style={{ fontSize: '18px', color: '#a0a0a0' }} />
            {isOpen && <span style={{ marginLeft: '10px', fontSize: '14px', color: '#666' }}>Workspace</span>}
          </div>

          {/* Pages */}
          <div
            onClick={() => handleSetActivePage('pages')} // Using new setter function
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '10px',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
              borderRadius: '5px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <FaFileAlt style={{ fontSize: '18px', color: '#a0a0a0' }} />
            {isOpen && <span style={{ marginLeft: '10px', fontSize: '14px', color: '#666' }}>Pages</span>}
          </div>

          {/* Shared Content */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
              borderRadius: '5px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <FaShareAlt style={{ fontSize: '18px', color: '#a0a0a0' }} />
            {isOpen && <span style={{ marginLeft: '10px', fontSize: '14px', color: '#666' }}>Shared Content</span>}
          </div>
        </div>

        {/* Main Content Area */}
        <div
          style={{
            flexGrow: 1,
            padding: '25px', // Added padding for space
            display: 'flex',
            flexDirection: 'column', // Make it a column to include username and page content
            backgroundColor: '#f9f9f9', // Light background for the main content area
            borderLeft: '1px solid #ddd', // Separation border for the username area
          }}
        >
          {renderContent()} {/* Render content based on active page */}
        </div>
      </div>


      {/* Overlay for dark background */}
      {showForm && (
        <div
          onClick={handleOverlayClick} // Close form on background click
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background
            zIndex: 10 // Ensure it appears above other elements
          }}
        />
      )}

      {/* Task Form Popup */}
      {showForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.01)', // Dark background
            zIndex: 10 // Ensure it appears above other elements
          }}
        />
      )}

      {/* Task Form Popup */}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <ul className="tab-list">
                {pages.map((item, index) => (
                  <li
                    key={index}
                    className={`tab-item ${activePage === item ? 'active' : ''}`}
                    onClick={() => handlePageClick(item)}
                  >
                    {item}
                    <div className="tab-underline" />
                  </li>
                ))}
              </ul>
              <div className="header-actions">
                <FaCalendarAlt style={{ margin: '0 10px', color: 'gray' }} />
                <FaCalendarAlt style={{ margin: '0 10px', color: 'gray' }} />
              </div>
            </div>

            <div className="modal-divider" />

            <div className="modal-body">
              {activePage === 'Task' && (
                <div className="task-container">
                  <h1 className="task-title">Social Media Calendar</h1>
                  <div className="task-input-section">
                    <input
                      type="text"
                      placeholder="Task name or type '/' for commands"
                      className="task-input"
                    />
                  </div>
                  <div className="task-description">
                    <p>Add description</p>
                  </div>
                  <div className="task-actions">
                    <button className="ai-button">Write with AI</button>
                  </div>
                  <div className="task-metadata">
                    <div className="metadata-item">TODO</div>
                    <div className="metadata-item">Assignee</div>
                    <div className="metadata-item">Due date</div>
                    <div className="metadata-item">Priority</div>
                  </div>
                  <div className="custom-fields">
                    <h3>Custom Fields</h3>
                    <ul>
                      <li>Captions and Hashtags</li>
                      <li>Task Manager</li>
                    </ul>
                  </div>
                  <div className="settings">
                    <button>Hide empty fields</button>
                  </div>
                </div>
              )}
              {activePage === 'Chat' && (
                <div className="chat-container">
                  <div className="chat-header">
                    <h1 className="chat-title">Team Chat</h1>
                    <div className="team-members">
                      {teamMembers.map(member => (
                        <img
                          key={member.id}
                          src={member.avatar}
                          alt={member.email}
                          className="member-avatar"
                          title={member.email}
                        />
                      ))}
                      <button
                        onClick={handleAddTeamMember}
                        className="add-member-btn"
                      >
                        <FaUserPlus />
                      </button>
                    </div>
                  </div>

                  <div className="chat-messages">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`message ${msg.sender === 'user' ? 'sent' : 'received'}`}
                      >
                        <div className="message-content">
                        
                        {msg.type === 'audio' && (
          <div className="audio-message">
            <audio 
              controls
              src={msg.audioUrl}
              className="audio-player"
            >
              Your browser does not support the [audio element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio).
            </audio>
          </div>
        )}


                          {msg.type === 'file' && (
                            <div className="file-preview">
                              <div className="file-info">
                                <FaPaperclip />
                                <span>{msg.fileName}</span>
                              </div>

                              {msg.fileType === 'image' && (
                                <img
                                  src={msg.fileUrl}
                                  alt={msg.fileName}
                                  className="file-preview-image"
                                />
                              )}

                              

                              {msg.fileType === 'video' && (
                                <video
                                  controls
                                  className="file-preview-video"
                                  src={msg.fileUrl}
                                />
                              )}

                              {msg.fileType === 'pdf' && (
                                <iframe
                                  src={msg.fileUrl}
                                  className="file-preview-pdf"
                                  title={msg.fileName}
                                />
                              )}

                              {msg.fileType === 'text' && (
                                <pre className="file-preview-text">
                                  {msg.fileContent}
                                </pre>
                              )}

                              <a
                                href={msg.fileUrl}
                                download={msg.fileName}
                                className="download-link"
                              >
                                Download
                              </a>
                            </div>
                          )}
                          {msg.type === 'text' && <p>{msg.text}</p>}
                          <span className="timestamp">{msg.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="chat-input-form">
                    <div className="chat-input-container">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileAttachment}
                        style={{ display: 'none' }}
                      />
                      <button
                        type="button"
                        className="attachment-btn"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <FaPaperclip />
                      </button>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="chat-input"
                      />
                      <button
                        type="button"
                        className={`voice-btn ${isRecording ? 'recording' : ''}`}
                        onClick={isRecording ? stopRecording : startRecording}
                      >
                        <FaMicrophone />
                      </button>
                      <button type="submit" className="send-btn">
                        <FaPaperPlane />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activePage === 'Whiteboard' && (
               <div className="whiteboard-container">
               <div className="whiteboard-toolbar">
                 <div className="tool-group">
                   <button
                     className={`tool-button ${selectedTool === 'pen' ? 'active' : ''}`}
                     onClick={() => setSelectedTool('pen')}
                   >
                     <FaPen /> Pen
                   </button>
                   <button
                     className={`tool-button ${selectedTool === 'eraser' ? 'active' : ''}`}
                     onClick={() => setSelectedTool('eraser')}
                   >
                     <FaEraser /> Eraser
                   </button>
                 </div>
                 <div className="action-group">
                   <button className="action-button" onClick={undo}><FaUndo /> Undo</button>
                   <button className="action-button" onClick={redo}><FaRedo /> Redo</button>
                   <button className="action-button" onClick={exportCanvas}><FaDownload /> Export</button>
                   <button className="action-button" onClick={share}><FaShare /> Share</button>
                 </div>
               </div>
               <div className="whiteboard-canvas" style={{ width: '100%', height: '100%' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ 
            width: '100%', 
            height: '100%',
            border:'1px solid #ccc',
            touchAction: 'none' // Prevent touch scrolling
          }}
        />
      </div>
             </div>
              )}

            </div>
          </div>
        </div>
      )}


      {showNoteInput && (
        <div
          ref={noteRef} // Attach ref to the note container
          style={{
            position: 'fixed',
            right: '20px', // Position it on the right side of the screen
            top: '70px', // Adjust the top position as needed
            width: '370px', // Set the width of the note input area
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            boxShadow: '1px 2px 10px 4px rgba(0,0,0,0.1)',
            zIndex: 1000, // Ensure it appears above other elements
          }}
        >
          {/* Header for Notepad */}
          <div
            style={{
              backgroundColor: '#FCD885',
              width: '100%',
              height: '40px',
              margin: '0',
              padding: '0',
              borderTopLeftRadius: '5px', // Rounded corners on the top left
              borderTopRightRadius: '5px', // Rounded corners on the top right
              display: 'flex',
              alignItems: 'center', // Center content vertically
              paddingLeft: '10px', // Padding for left alignment
            }}
          >
            <p
              style={{
                color: 'black',
                fontSize: '15px',
                margin: '0',
              }}
            >
              Notepad
            </p>
          </div>

          {/* Content Area */}
          <div
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: '400px',
              margin: '0',
              padding: '12px', // Reduced padding for better spacing
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomLeftRadius: '5px', // Rounded corners on the bottom left
              borderBottomRightRadius: '5px', // Rounded corners on the bottom right
            }}
          >
            <FaRegStickyNote style={{ color: 'gray', fontSize: '40px', marginBottom: '5px' }} />
            <p style={{ fontSize: '20px', fontWeight: '500', margin: '5px 0' }}>Create personal notes</p>
            <p style={{ margin: '0', textAlign: 'center', fontSize: '12px' }}>
              Capture your thoughts or ideas and access them anywhere in ClickUp!
            </p>
            <button
              style={{
                backgroundColor: '#f9f9f9',
                color: 'black',
                border: '0',
                margin: '10px',
                borderRadius: '7px',
                padding: '10px 15px',
                cursor: 'pointer',
                outline: 'none',
                fontSize: '13px',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FCD885')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FCD885')}
            >
              Create Note
            </button>
          </div>
        </div>
      )}



      {/* menu part */}
      {menu && (
        <div
          ref={menuRef} // Attach ref to the menu container
          style={{
            position: 'fixed',
            right: '20px',
            top: '70px',
            width: '280px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: 'white',
            boxShadow: '1px 2px 10px 4px rgba(0,0,0,0.1)',
            zIndex: 1000,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Menu items */}
            <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '10px', marginTop: '20px' }}>
              <div style={menuItemStyle}></div>
              <div style={menuItemStyle}></div>
              <div style={menuItemStyle}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '10px' }}>
              <div style={menuItemStyle}></div>
              <div style={menuItemStyle}></div>
              <div style={menuItemStyle}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '10px' }}>
              <div style={menuItemStyle}></div>
              <div style={menuItemStyle}></div>
              <div style={menuItemStyle}></div>
            </div>
            <div style={{ display: 'flex', margin: '10px' }}>
              <div style={{ ...menuItemStyle, marginBottom: '20px', marginLeft: '10px' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* light and dark mode for the screen */}
      {theme && (
        <div
          ref={modalRef}
          style={{
            position: 'fixed',
            right: '20px',
            top: '70px',
            width: '320px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            padding: '15px',
          }}
        >
          <div style={{ marginBottom: '15px' }}>
            {/* Theme Modal Header */}
            <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Themes</p>
            <p style={{ color: '#888', fontSize: '13px', marginBottom: '15px', lineHeight: '1.4' }}>
              Customize your workspace by choosing between light or dark themes and selecting a color.
            </p>
          </div>

          {/* Light and Dark Mode Toggle */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#f7f7f7',
              padding: '10px',
              borderRadius: '6px',
              gap: '10px',
            }}
          >
            {/* Light Mode Option */}
            <div
              onClick={() => setThemeMode('light')}
              style={{
                cursor: 'pointer',
                backgroundColor: themeMode === 'light' ? '#f1f1f1' : '#ffffff',
                borderRadius: '6px',
                padding: '8px 12px',
                flex: 1,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: themeMode === 'light' ? 1 : 0.5,
                border: themeMode === 'light' ? '2px solid #4CAF50' : '1px solid #e0e0e0',
                boxShadow: themeMode === 'light' ? '0px 4px 10px rgba(0, 0, 0, 0.15)' : 'none',
                transition: 'background-color 0.2s, border 0.2s, opacity 0.2s',
              }}
            >
              <FaSun style={{ marginRight: '6px', color: '#FFC107' }} />
              <p style={{ margin: '0', fontSize: '14px', fontWeight: themeMode === 'light' ? '600' : '400' }}>
                Light Mode
              </p>
            </div>

            {/* Dark Mode Option */}
            <div
              onClick={() => setThemeMode('dark')}
              style={{
                cursor: 'pointer',
                backgroundColor: themeMode === 'dark' ? '#f1f1f1' : '#ffffff',
                borderRadius: '6px',
                padding: '8px 12px',
                flex: 1,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: themeMode === 'dark' ? 1 : 0.5,
                border: themeMode === 'dark' ? '2px solid #4CAF50' : '1px solid #e0e0e0',
                boxShadow: themeMode === 'dark' ? '0px 4px 10px rgba(0, 0, 0, 0.15)' : 'none',
                transition: 'background-color 0.2s, border 0.2s, opacity 0.2s',
              }}
            >
              <FaMoon style={{ marginRight: '6px', color: '#3E4C59' }} />
              <p style={{ margin: '0', fontSize: '14px', fontWeight: themeMode === 'dark' ? '600' : '400' }}>
                Dark Mode
              </p>
            </div>
          </div>

          {/* Color Selection Panel */}
          <div style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Select Theme Color</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)', // Two columns to display color and name in one row
                gap: '10px',
              }}
            >
              {colors.map((color) => (
                <div
                  key={color.code}
                  onClick={() => setSelectedColor(color.code)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '10px',
                    borderRadius: '6px',
                    backgroundColor: selectedColor === color.code ? '#e0e0e0' : '#fff',
                    border: selectedColor === color.code ? `2px solid ${color.code}` : '1px solid #e0e0e0',
                    transition: 'background-color 0.2s, border 0.2s',
                  }}
                >
                  {/* Color Circle */}
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: color.code,
                      borderRadius: '50%',
                      marginRight: '10px',
                    }}
                  ></div>

                  {/* Color Name */}
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: selectedColor === color.code ? '600' : '400' }}>
                    {color.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}





    </div>
  );
};

const menuItemStyle = {
  width: '70px',
  height: '70px',
  borderRadius: '5px',
  boxShadow: '1px 2px 10px 4px rgba(0,0,0,0.1)',
  border: '1px solid #ccc',
};

export default CustomNavbar;
