import React, { useState, useRef, useEffect } from "react";
import { fetchSongs } from "../utils/fetchSongs";
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  Slider,
  Card,
  CardContent,
  IconButton,
  Input,
  Box,
} from "@mui/material";
import { PlayArrow, Pause, SkipNext, SkipPrevious, Stop, Repeat, Shuffle } from "@mui/icons-material";

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState({ default: [] });
  const [currentPlaylist, setCurrentPlaylist] = useState("default");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState("gradient1"); // State for skin
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const getSongs = async () => {
      const songsList = await fetchSongs();
      setSongs(songsList);
      setPlaylists({ default: songsList });
    };
    getSongs();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => setCurrentTime(audioRef.current.currentTime);
      audioRef.current.onloadedmetadata = () => setDuration(audioRef.current.duration);
      audioRef.current.onended = nextSong;
    }
  }, []);

  const addPlaylist = () => {
    if (newPlaylistName && !playlists[newPlaylistName]) {
      setPlaylists((prev) => ({ ...prev, [newPlaylistName]: [] }));
      setNewPlaylistName("");
    }
  };

  const currentSongs = playlists[currentPlaylist] || [];

  const playSong = () => {
    if (currentSongs.length === 0) return;
    const song = currentSongs[currentIndex];
    audioRef.current.src = song.url;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const nextSong = () => {
    if (currentSongs.length === 0) return;
    if (isRepeat) {
      playSong();
    } else {
      if (isShuffle) {
        const randomIndex = Math.floor(Math.random() * currentSongs.length);
        setCurrentIndex(randomIndex);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % currentSongs.length);
      }
      setTimeout(playSong, 0);
    }
  };

  const prevSong = () => {
    if (currentSongs.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? currentSongs.length - 1 : prevIndex - 1));
    setTimeout(playSong, 0);
  };

  const addSongToPlaylist = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newSong = { id: Date.now(), title: file.name, url };
      setPlaylists((prev) => ({
        ...prev,
        [currentPlaylist]: [...prev[currentPlaylist], newSong],
      }));
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeekChange = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  // Skin gradient styles
  const gradients = {
    gradient1: "linear-gradient(to right, #000000, #434343)",
    gradient2: "linear-gradient(to right, #ff7e5f, #feb47b)",
    gradient3: "linear-gradient(to right, #6a11cb, #2575fc)",
    gradient4: "linear-gradient(to right, #00c6ff, #0072ff)",
    gradient5: "linear-gradient(to right, #8e2de2, #4a00e0)",
  };

  return (
    <Container maxWidth="md" style={{
      textAlign: "center",
      padding: "20px",
      background: gradients[selectedSkin],  
      borderRadius: "10px",
    }}>

      {/* Skin changer dropdown */}
      <Select
        value={selectedSkin}
        onChange={(e) => setSelectedSkin(e.target.value)}
        style={{
          marginBottom: "20px",
          width: "130px",
          height: "38px",
          marginRight: "10px",
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "5px"
        }}
      >
        {Object.keys(gradients).map((skin) => (
          <MenuItem key={skin} value={skin}>
            {skin.replace('gradient', 'Skin ')}
          </MenuItem>
        ))}
      </Select>

      {/* Music Library Section */}
      <Box style={{ textAlign: "left", color: "#fff", marginBottom: "20px" }}>
        <Typography variant="h6">Music Library</Typography>
        <ul>
          {songs.map((song) => (
            <li key={song.id}>
              {song.title}
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  setCurrentIndex(songs.indexOf(song));
                  audioRef.current.src = song.url;
                  playSong();
                }}
                style={{ marginLeft: "10px" }}
              >
                Play
              </Button>
            </li>
          ))}
        </ul>
      </Box>

      <Select
        value={currentPlaylist}
        onChange={(e) => setCurrentPlaylist(e.target.value)}
        style={{
          marginBottom: "10px", 
          width: "130px", 
          height: "38px", 
          marginRight: "10px", 
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "5px"
        }}
      >
        {Object.keys(playlists).map((playlist) => (
          <MenuItem key={playlist} value={playlist}>
            {playlist}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="secondary" onClick={addPlaylist}>
        Add Playlist
      </Button>

      <TextField
        label="New Playlist Name"
        value={newPlaylistName}
        onChange={(e) => setNewPlaylistName(e.target.value)}
        size="small"
        fullWidth
        style={{
          marginTop: "10px", 
          background: "rgba(255, 255, 255, 0.8)", 
          borderRadius: "5px"
        }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => document.getElementById('add-song-input').click()}
        style={{ marginTop: "10px" }}
      >
        Add Song
      </Button>

      <Input
        id="add-song-input"
        type="file"
        accept="audio/*"
        onChange={addSongToPlaylist}
        style={{ display: "none" }}
      />

      <Box style={{ marginTop: "20px", textAlign: "left", color: "#fff" }}>
        <Typography variant="h6">Playlist Tracks</Typography>
        <ul>
          {currentSongs.map((song, index) => (
            <li key={song.id}>
              {song.title}
              {index === currentIndex && " (Now Playing)"}
            </li>
          ))}
        </ul>
      </Box>

      <Card style={{ marginTop: "20px", padding: "15px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "10px" }}>
        <CardContent>
          <Typography variant="h6" style={{ color: "#fff" }}>
            {currentSongs[currentIndex]?.title || "No song selected"}
          </Typography>
          <Slider
            value={currentTime}
            max={duration || 100}
            onChange={handleSeekChange}
            style={{ width: "80%", marginTop: "10px" }}
          />
          <Typography variant="body2" style={{ color: "#fff" }}>
  {formatTime(currentTime)} / {formatTime(duration)} - {formatTime(duration - currentTime)} remaining
</Typography>

          <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
            <IconButton onClick={prevSong}><SkipPrevious /></IconButton>
            <IconButton onClick={stopSong}><Stop /></IconButton>
            {isPlaying ? (
              <IconButton onClick={pauseSong}><Pause /></IconButton>
            ) : (
              <IconButton onClick={playSong}><PlayArrow /></IconButton>
            )}
            <IconButton onClick={nextSong}><SkipNext /></IconButton>
            <IconButton onClick={toggleRepeat} color={isRepeat ? "primary" : "default"}>
              <Repeat />
            </IconButton>
            <IconButton onClick={toggleShuffle} color={isShuffle ? "primary" : "default"}>
              <Shuffle />
            </IconButton>
          </div>
          <Slider
            value={volume}
            onChange={(e, newValue) => setVolume(newValue)}
            min={0}
            max={1}
            step={0.01}
            style={{ width: "80%", marginTop: "10px" }}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default MusicPlayer;
