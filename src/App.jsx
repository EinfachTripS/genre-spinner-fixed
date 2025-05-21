
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const genres = [
  "Pop", "Rock", "Hip-Hop", "R&B", "Jazz", "Blues", "Country", "Reggae", "Ska", "Punk",
  "Metal", "Heavy Metal", "Thrash Metal", "Death Metal", "Black Metal", "Doom Metal",
  "Power Metal", "Progressive Metal", "Alternative Rock", "Indie Rock", "Grunge", "Funk",
  "Soul", "Disco", "House", "Deep House", "Tech House", "Electro", "Techno", "Trance",
  "Psytrance", "Drum and Bass", "Dubstep", "Future Bass", "Trap (EDM)", "Chillstep",
  "Ambient", "Lo-fi", "Synthwave", "Vaporwave", "Industrial", "Noise", "Experimental",
  "Classical", "Baroque", "Romantic (Classical)", "Contemporary Classical", "Opera",
  "Chiptune", "Video Game Music", "K-Pop", "J-Pop", "J-Rock", "City Pop", "Latin Pop",
  "Reggaeton", "Bachata", "Merengue", "Salsa", "Cumbia", "Tango", "Flamenco", "Afrobeat",
  "Highlife", "Soukous", "Gqom", "Amapiano", "Dancehall", "Moombahton", "Bossa Nova",
  "Samba", "Bollywood", "Indian Classical", "Carnatic", "Qawwali", "Klezmer", "Balkan",
  "Celtic", "Folk", "Indie Folk", "Bluegrass", "Americana", "Alternative Hip-Hop",
  "Cloud Rap", "Boom Bap", "Drill", "UK Garage", "Grime", "Trip-Hop", "Downtempo",
  "New Age", "Spoken Word", "Acoustic", "Post-Rock", "Post-Punk", "Math Rock",
  "Emo", "Screamo", "Shoegaze", "Noise Rock",
  "Glitch Hop", "Neo Soul", "Electro Swing", "Jazz Fusion", "Hardstyle", "Italo Disco",
  "Chillhop", "Gospel", "IDM", "Big Room", "Breakcore", "Darkwave", "Dream Pop",
  "Funk Carioca", "Gabber", "Hardcore Punk", "Jungle", "Krautrock", "Latin Jazz",
  "Liquid DnB", "Lounge", "Melodic Techno", "Microhouse", "Minimal", "Neoclassical",
  "New Wave", "Noise Pop", "Outlaw Country", "Phonk", "Progressive House", "Rap Rock",
  "Reggae Fusion", "Rockabilly", "Shoegaze Punk", "Sludge Metal", "Slowcore",
  "Space Rock", "Speed Garage", "Surf Rock", "Swing", "Synthpop", "Tech Trance",
  "Third Stream", "Traditional Folk", "Trap Metal", "Tropical House", "UK Funky",
  "Urban Pop", "Visual Kei", "Worldbeat", "Zydeco"
];

export default function MusicGenreSpinner() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [history, setHistory] = useState([]);
  const wheelRef = useRef(null);

  const availableGenres = genres.filter((genre) => !history.includes(genre));

  const spinWheel = () => {
    if (availableGenres.length === 0) return;
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * availableGenres.length);
    const genre = availableGenres[randomIndex];
    const indexInFullList = genres.indexOf(genre);
    const anglePerSlice = 360 / genres.length;
    const randomRotation = 3600 + indexInFullList * anglePerSlice;
    setRotation(randomRotation);
    setTimeout(() => {
      setSelectedGenre(genre);
      setHistory((prev) => [genre, ...prev]);
      setSpinning(false);
    }, 4000);
  };

  const resetWheel = () => {
    setSelectedGenre(null);
    setHistory([]);
    setRotation(0);
  };

  const renderGenreLabels = () => {
    const anglePerSlice = 360 / genres.length;
    return genres.map((genre, index) => {
      const angle = index * anglePerSlice;
      const isUsed = history.includes(genre);
      return (
        <div
          key={index}
          style={{
            position: 'absolute', width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: `rotate(${angle}deg)`
          }}
        >
          <div
            style={{
              transform: `rotate(-${angle}deg) translateY(-230px)`,
              fontSize: '10px', color: isUsed ? 'gray' : 'black', whiteSpace: 'nowrap'
            }}
          >
            {genre}
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: 20, backgroundColor: '#111', color: 'white' }}>
      <h1 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 24 }}>🎧 Musikgenre Glücksrad</h1>
      <div style={{ position: 'relative', width: 500, height: 500, marginBottom: 24 }}>
        <motion.div
          ref={wheelRef}
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: "easeOut" }}
          style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '4px solid pink', backgroundColor: 'white' }}
        >
          {renderGenreLabels()}
        </motion.div>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '20px solid yellow', zIndex: 10 }} />
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button
          onClick={spinWheel}
          disabled={spinning || availableGenres.length === 0}
          style={{ padding: '10px 20px', backgroundColor: '#ec4899', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', opacity: spinning || availableGenres.length === 0 ? 0.5 : 1 }}
        >
          {availableGenres.length === 0 ? "Alle Genres verwendet" : spinning ? "Dreht..." : "Drehen"}
        </button>
        <button
          onClick={resetWheel}
          disabled={spinning}
          style={{ padding: '10px 20px', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', opacity: spinning ? 0.5 : 1 }}
        >
          Zurücksetzen
        </button>
      </div>
      {selectedGenre && !spinning && (
        <motion.div
          key={selectedGenre}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: 22, fontWeight: 600, textAlign: 'center', background: 'linear-gradient(to right, #06b6d4, #ec4899)', padding: '10px 20px', borderRadius: 12 }}
        >
          🎶 {selectedGenre}
        </motion.div>
      )}
      {history.length > 0 && (
        <div style={{ marginTop: 32, maxWidth: 500, width: '100%' }}>
          <h2 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>🎵 Verlauf:</h2>
          <ul style={{ fontSize: 14, paddingLeft: 20 }}>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
