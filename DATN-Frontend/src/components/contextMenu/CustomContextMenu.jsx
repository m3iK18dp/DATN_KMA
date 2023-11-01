/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineRight, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import {
  RiPlayListAddFill,
  RiHeartAddFill,
  RiPlayListAddLine,
} from "react-icons/ri";
import { TbPlaylistOff } from "react-icons/tb";
import { CiPlay1 } from "react-icons/ci";
import "../../css/customContextMenu.css";
const CustomContextMenu = ({
  x,
  y,
  id,
  playlists,
  setPlaylists,
  navigate,
  handleAddPlaylist,
  handleUpdatePlaylist,
  handleDeletePlaylist,
  handlePlaySong,
  handleNewSong,
  handleUpdateSong,
  handleDeleteSong,
  addSongToPlaylist,
  deleteSongInPlaylist,
  isLoggedIn,
  isAdmin,
  location,
  prams,
  type = "song",
}) => {
  const alertRevoked =
    "Your account has been revoked, login with another account or contact Administrator to unlock your account to use more features.";
  const [showFormAddPlaylist, setShowFormAddPlaylist] = useState(false);
  const [show, setShow] = useState({
    display: "none",
    left: x,
    top: y,
  });
  const [showPlaylistMenu, setShowPlaylistMenu] = useState({
    display: "none",
    x: 245,
    y: 0,
  });
  const [playlist, setPlaylist] = useState({ name: "" });

  const set = (prop, value) => {
    setPlaylist({ ...playlist, [prop]: value });
  };
  const get = (field) => {
    return playlist[field];
  };

  useEffect(() => {
    let winWidth = window.innerWidth,
      cmWidth = 190,
      winHeight = window.innerHeight,
      cmHeight = isLoggedIn
        ? id !== -1 && type.includes("song")
          ? location.pathname.includes("my_playlist")
            ? 255
            : 220
          : id !== -1 && type.includes("playlist")
          ? 152
          : 44
        : id !== -1 && type.includes("song")
        ? 118
        : 44;
    if (isLoggedIn && !isAdmin && location.pathname !== "/my_songs")
      cmHeight =
        id !== -1 && type.includes("song")
          ? location.pathname.includes("my_playlist")
            ? 186
            : 152
          : id !== -1 && type.includes("playlist")
          ? 152
          : 44;
    setShow({
      display: "block",
      left: x > winWidth - cmWidth ? x - cmWidth : x,
      top: y > winHeight - cmHeight - 50 ? y - cmHeight : y,
    });
    setShowPlaylistMenu({
      display: "none",
      left: x > winWidth - cmWidth - 150 ? 5 - 150 : 185,
      top: y > winHeight + 115 - 300 ? cmHeight - 300 : 115,
    });
  }, [id, isAdmin, isLoggedIn, location.pathname, type, x, y]);

  const addPlaylist = () => {
    // if (JSON.parse(sessionStorage.getItem("isRevoked"))) {
    //   alert(alertRevoked);
    // } else {
    //   if (type.includes("playlist")) {
    //     handleAddPlaylist();
    //     setShowPlaylistMenu({ ...showPlaylistMenu, display: "none" });
    //   } else if (type.includes("song"))
    //     playlistService.insertPlaylist(playlist, navigate).then((res) => {
    //       if (res.status === "ok") {
    //         setPlaylists([...playlists, res.data]);
    //         setPlaylist({ name: "" });
    //         listPlaylist(playlists);
    //         alert("Add playlist success.");
    //       } else alert(res.message);
    //     });
    // }
  };

  function listPlaylist(pls = playlists) {
    return pls
      .filter((playlist) => playlist.id !== parseInt(prams.playlist_id))
      .map((playlist) => (
        // <>
        <div
          className="context-menu-row"
          key={"context-playlist-" + playlist.id}
          onClick={() => {
            addSongToPlaylist(playlist.id, id);
          }}
        >
          <h6 style={{ marginBottom: 0 }}>{playlist.name}</h6>
        </div>
      ));
  }
  return (
    <>
      {type.includes("song") && (
        <div
          id="context-menu"
          className="context-menu"
          onClick={(e) => e.stopPropagation()}
          style={show}
        >
          <div
            className="context-menu-row flex"
            onMouseOver={() => {
              setShowPlaylistMenu({ ...showPlaylistMenu, display: "none" });
            }}
            onClick={() => handleNewSong()}
          >
            <div>
              <RiHeartAddFill />
              <h6 style={{ marginBottom: 0 }}>Add new Song</h6>
            </div>
          </div>
          {id !== -1 && (
            <>
              <hr style={{ margin: 0 }}></hr>
              <div
                onMouseOver={() => {
                  setShowPlaylistMenu({ ...showPlaylistMenu, display: "none" });
                }}
                style={{
                  padding: 5,
                  borderRadius: 5,
                  marginBottom: 5,
                }}
              >
                <div>
                  <h6 style={{ marginBottom: 0 }}>Song ID : {id}</h6>
                </div>
              </div>
              <div className="context-menu-row flex">
                <div
                  onMouseOver={() => {
                    setShowPlaylistMenu({
                      ...showPlaylistMenu,
                      display: "none",
                    });
                  }}
                  onClick={() => {
                    handlePlaySong(id);
                    setShow({ ...show, display: "none" });
                  }}
                >
                  <CiPlay1 />
                  <h6 style={{ marginBottom: 0 }}>Play Song</h6>
                </div>
              </div>
              {isLoggedIn && (
                <>
                  <div
                    className="context-menu-row flex"
                    onMouseOver={() => {
                      setShowPlaylistMenu({
                        ...showPlaylistMenu,
                        display: "block",
                      });
                    }}
                  >
                    <div>
                      <RiPlayListAddFill />
                      <h6 style={{ marginBottom: 0 }}>Add Song to Playlist</h6>
                    </div>
                    <AiOutlineRight></AiOutlineRight>
                  </div>
                  {location.pathname.includes("my_playlist") && (
                    <div
                      className="context-menu-row flex"
                      onMouseOver={() => {
                        setShowPlaylistMenu({
                          ...showPlaylistMenu,
                          display: "none",
                        });
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteSongInPlaylist(prams.playlist_id, id);
                      }}
                    >
                      <div>
                        <TbPlaylistOff></TbPlaylistOff>
                        <h6
                          style={{ marginBottom: 0, backgroundColor: "unset" }}
                        >
                          Delete Song in this Playlist
                        </h6>
                      </div>
                    </div>
                  )}

                  <div
                    id="playlist-menu"
                    className="context-menu list-playlist"
                    style={showPlaylistMenu}
                  >
                    <div
                      className="context-menu-row"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (JSON.parse(sessionStorage.getItem("isRevoked"))) {
                          alert(alertRevoked);
                        } else setShowFormAddPlaylist(!showFormAddPlaylist);
                      }}
                      onMouseOver={(event) => {
                        event.target.style.cursor = "pointer";
                      }}
                    >
                      <h6>Add Playlist</h6>
                      {/* <IoMdAdd></IoMdAdd> */}
                    </div>
                    {showFormAddPlaylist && (
                      <div className="context-menu-row flex">
                        <h6>Name:</h6>
                        <input
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) => {
                            // event.stopPropagation();
                            set("name", event.target.value);
                          }}
                          style={{ width: "100%" }}
                          value={get("name")}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              addPlaylist();
                            }
                          }}
                          placeholder="Enter name playlist"
                        ></input>

                        <CustomButton
                          IconButton={IoMdAdd}
                          func={addPlaylist}
                          size={20}
                          id="add-playlist"
                          color="black"
                        />
                      </div>
                    )}
                    <hr style={{ margin: 0 }}></hr>
                    {listPlaylist(playlists)}
                  </div>
                  {(JSON.parse(sessionStorage.getItem("isRevoked")) ||
                    isLoggedIn) &&
                    (isAdmin || location.pathname === "/my_songs") && (
                      <>
                        <div className="context-menu-row flex">
                          <div
                            onMouseOver={() => {
                              setShowPlaylistMenu({
                                ...showPlaylistMenu,
                                display: "none",
                              });
                            }}
                            onClick={() => handleUpdateSong(id)}
                          >
                            <AiOutlineEdit />
                            <h6>Edit Song</h6>
                          </div>
                        </div>
                        <div className="context-menu-row flex">
                          <div
                            onMouseOver={() => {
                              setShowPlaylistMenu({
                                ...showPlaylistMenu,
                                display: "none",
                              });
                            }}
                            onClick={() => {
                              setShow({ ...show, display: "none" });
                              handleDeleteSong(id);
                            }}
                          >
                            <AiOutlineDelete />
                            <h6>Delete Song</h6>
                          </div>
                        </div>
                      </>
                    )}
                </>
              )}
            </>
          )}
        </div>
      )}
      {type.includes("playlist") && (
        <div
          id="context-menu"
          className="context-menu"
          onClick={(e) => e.stopPropagation()}
          style={show}
        >
          <div className="context-menu-row flex">
            <div
              onClick={() => {
                setShow({ ...show, display: "none" });
                addPlaylist();
              }}
            >
              <RiPlayListAddLine />
              <h6 style={{ marginBottom: 0 }}>Add new Playlist</h6>
            </div>
          </div>
          {id !== -1 && (
            <>
              <hr style={{ margin: 0 }}></hr>
              <div
                style={{
                  padding: 5,
                  borderRadius: 5,
                  marginBottom: 5,
                }}
              >
                <div>
                  <h6 style={{ marginBottom: 0 }}>Playlist ID : {id}</h6>
                </div>
              </div>

              <div className="context-menu-row flex">
                <div
                  onClick={() => {
                    handleUpdatePlaylist(id);
                    setShow({ ...show, display: "none" });
                  }}
                >
                  <AiOutlineEdit />
                  <h6 style={{ marginBottom: 0 }}>Edit Playlist name</h6>
                </div>
              </div>
              <div className="context-menu-row flex">
                <div
                  onClick={() => {
                    handleDeletePlaylist(id, navigate);
                    setShow({ ...show, display: "none" });
                  }}
                >
                  <AiOutlineDelete />
                  <h6 style={{ marginBottom: 0 }}>Delete Playlist</h6>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default CustomContextMenu;
