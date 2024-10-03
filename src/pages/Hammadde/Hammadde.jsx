import {
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Autocomplete
} from '@mui/material';
import MainCard from 'components/MainCard';
import decodeAndDecompressData from 'api/decompressedData';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';

export default function DashboardPage() {
  const [stokHammadde, setStokHammadde] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSilo, setSelectedSilo] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#1679AB');
  const [searchValue, setSearchValue] = useState(''); // Arama değeri

  const fetchData = async () => {
    try {
      const res = await axios.get(`${GetAPIUrl()}/api/Silo/GetStokHammadde`);
      if (res.data) {
        const hammadde = decodeAndDecompressData(res.data);
        setStokHammadde(hammadde);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateSiloColor = async (silo) => {
    await axios
      .get(`${GetAPIUrl()}/api/Silo/UpdateStokHammaddeColor`, {
        params: {
          Id: silo.Id,
          Color: selectedColor
        }
      })
      .then((res) => {
        if (res.data) {
          fetchData();
          setOpenDialog(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenDialog = (silo) => {
    setSelectedSilo(silo);
    setSelectedColor(silo.Color);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSilo(null);
  };

  useEffect(() => {
    // İlk olarak fetchData'yı bir kez çalıştır
    fetchData();

    // Ardından her dakikada bir fetchData'yı çalıştıracak interval ayarla
    const interval = setInterval(() => {
      fetchData();
    }, 1000 * 60);

    // Komponent unmount olduğunda interval'i temizle
    return () => clearInterval(interval);
  }, []);

  // Arama sonucuna göre filtreleme
  const filteredData = stokHammadde.filter(
    (hammadde) =>
      hammadde.StokNo.toLowerCase().includes(searchValue.toLowerCase()) || hammadde.StokAd.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Grid display={'flex'} justifyContent={'end'} mb={1}>
        <Autocomplete
          sx={{ width: 500 }}
          options={stokHammadde.map((hammadde) => hammadde.StokNo)}
          value={searchValue}
          onChange={(event, newValue) => setSearchValue(newValue || '')}
          renderInput={(params) => (
            <TextField {...params} label="Ara" variant="outlined" onChange={(e) => setSearchValue(e.target.value)} />
          )}
        />
      </Grid>
      <MainCard>
        <Grid>
          <Grid display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center' }}>Stok Kodu</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Stok Adı</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Miktar</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Renk</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((hammadde) => (
                  <TableRow key={hammadde.Id}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <button
                        style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}
                        onClick={() => handleOpenDialog(hammadde)} // Open dialog on click
                      >
                        <Typography>{hammadde.StokNo}</Typography>
                      </button>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{hammadde.StokAd}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{hammadde.StokMiktar}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <button
                        style={{
                          width: '30px',
                          height: '30px',
                          backgroundColor: hammadde.Color ? hammadde.Color : 'gray',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleOpenDialog(hammadde)}
                      />
                      <Grid>{hammadde.Color ? hammadde.Color : 'Renk Seçilmedi'}</Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </MainCard>

      {/* Silo Detayları */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          {selectedSilo?.SiloName || 'Silo Detayları'}
        </DialogTitle>
        <DialogContent>
          {selectedSilo && (
            <Grid container>
              <Grid>
                <Grid item>
                  <Grid>
                    <Typography ml={1}>Renk Seçimi</Typography>
                  </Grid>
                  {/* <TextField
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    sx={{
                      border: 'none',
                      outline: 'none',
                      width: '225px',
                      cursor: 'pointer'
                    }}
                  /> */}
                  <ChromePicker
                    color={selectedColor}
                    onChange={(color) => setSelectedColor(color.hex)}
                    disableAlpha // Alpha kanalını kaldırmak için
                  />
                </Grid>
                <Grid item mt={2}>
                  <button
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: selectedSilo.Color ? selectedSilo.Color : 'gray',
                      color: 'white',
                      fontWeight: 'bold',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer'
                    }}
                    onClick={() => updateSiloColor(selectedSilo)}
                  >
                    Kaydet
                  </button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
