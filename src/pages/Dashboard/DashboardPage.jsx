import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import { Silo } from 'components/SiloSVG/SiloSvg';
import decodeAndDecompressData from 'api/decompressedData';
import axios from 'axios';
import { GetAPIUrl } from 'api/gama';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [siloData, setSiloData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSilo, setSelectedSilo] = useState(null);
  const [miktar, setMiktar] = useState(0);
  const [kapasite, setKapasite] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${GetAPIUrl()}/api/Silo/GetSiloCapacity`);
      if (res.data) {
        const decodedData = decodeAndDecompressData(res.data); // Assuming this returns an array
        setSiloData(decodedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const UpdateSiloDozaj = async (silo) => {
    await axios
      .get(`${GetAPIUrl()}/api/Silo/UpdateSiloDozajByCapacityAndAmount`, {
        params: {
          Id: silo.Id,
          Kapasite: kapasite,
          Miktar: miktar
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
    setMiktar(silo.Miktar);
    setKapasite(silo.Kapasite);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSilo(null);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <MainCard>
        <Grid>
          <Grid>
            <Typography
              textAlign={'center'}
              fontSize={30}
              fontWeight={700}
              color={'#FAA300'}
              sx={{ borderBottom: '5px solid #FAA300', mb: 2, padding: '5px 0px' }}
            >
              Büyükbaş Hammadde-1
            </Typography>
          </Grid>
          <Grid display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'}>
            {Array.isArray(siloData[0]) && siloData[0].length > 0 ? (
              siloData[0]
                .filter((x) => x.SiloGrubuAd == 'BÜYÜK BAŞ HAMMADDE 1')
                .map((silo) => (
                  <button
                    style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}
                    onClick={() => handleOpenDialog(silo)}
                    key={silo.Id}
                  >
                    <Silo
                      width={'124px'}
                      height={'184px'}
                      color={silo.Color}
                      siloName={silo.SiloName}
                      seviye={silo.Miktar < 1 || silo.Kapasite < 1 ? 0 : (silo.Miktar * 100) / silo.Kapasite}
                      stokName={silo.StokName}
                      miktar={silo.Miktar}
                      kapasite={silo.Kapasite}
                    />
                  </button>
                ))
            ) : (
              <Typography variant="h6">Data Yok</Typography>
            )}
          </Grid>
        </Grid>
        <Grid mt={3}>
          <Grid>
            <Typography
              textAlign={'center'}
              fontSize={30}
              fontWeight={700}
              color={'#D2FF72'}
              sx={{ borderBottom: '5px solid #D2FF72', mb: 2, padding: '5px 0px' }}
            >
              Büyükbaş Hammadde-2
            </Typography>
          </Grid>
          <Grid display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'}>
            {Array.isArray(siloData[0]) && siloData[0].length > 0 ? (
              siloData[0]
                .filter((x) => x.SiloGrubuAd == 'BÜYÜK BAŞ HAMMADDE 2')
                .map((silo) => (
                  <button
                    style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}
                    onClick={() => handleOpenDialog(silo)}
                    key={silo.Id}
                  >
                    <Silo
                      width={'124px'}
                      height={'184px'}
                      color={silo.Color}
                      siloName={silo.SiloName}
                      seviye={silo.Miktar < 1 || silo.Kapasite < 1 ? 0 : (silo.Miktar * 100) / silo.Kapasite}
                      stokName={silo.StokName}
                      miktar={silo.Miktar}
                      kapasite={silo.Kapasite}
                    />
                  </button>
                ))
            ) : (
              <Typography variant="h6">Data Yok</Typography>
            )}
          </Grid>
        </Grid>
        <Grid mt={3}>
          <Grid>
            <Typography
              textAlign={'center'}
              fontSize={30}
              fontWeight={700}
              color={'#ECDFCC'}
              sx={{ borderBottom: '5px solid #ECDFCC', mb: 2, padding: '5px 0px' }}
            >
              Büyükbaş Yağ
            </Typography>
          </Grid>
          <Grid display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'}>
            {Array.isArray(siloData[0]) && siloData[0].length > 0 ? (
              siloData[0]
                .filter((x) => x.SiloGrubuAd == 'BB YAG')
                .map((silo) => (
                  <button
                    style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}
                    onClick={() => handleOpenDialog(silo)}
                    key={silo.Id}
                  >
                    <Silo
                      width={'124px'}
                      height={'184px'}
                      color={silo.Color}
                      siloName={silo.SiloName}
                      seviye={silo.Miktar < 1 || silo.Kapasite < 1 ? 0 : (silo.Miktar * 100) / silo.Kapasite}
                      stokName={silo.StokName}
                      miktar={silo.Miktar}
                      kapasite={silo.Kapasite}
                    />
                  </button>
                ))
            ) : (
              <Typography variant="h6">Data Yok</Typography>
            )}
          </Grid>
        </Grid>
        <Grid mt={3}>
          <Grid>
            <Typography
              textAlign={'center'}
              fontSize={30}
              fontWeight={700}
              color={'#7CF5FF'}
              sx={{ borderBottom: '5px solid #7CF5FF', mb: 2, padding: '5px 0px' }}
            >
              Büyükbaş Premix - 1
            </Typography>
          </Grid>
          <Grid display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'}>
            {Array.isArray(siloData[0]) && siloData[0].length > 0 ? (
              siloData[0]
                .filter((x) => x.SiloGrubuAd == 'BB PREMİKS 1')
                .map((silo) => (
                  <button
                    style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}
                    onClick={() => handleOpenDialog(silo)}
                    key={silo.Id}
                  >
                    <Silo
                      width={'124px'}
                      height={'184px'}
                      color={silo.Color}
                      siloName={silo.SiloName}
                      seviye={silo.Miktar < 1 || silo.Kapasite < 1 ? 0 : (silo.Miktar * 100) / silo.Kapasite}
                      stokName={silo.StokName}
                      miktar={silo.Miktar}
                      kapasite={silo.Kapasite}
                    />
                  </button>
                ))
            ) : (
              <Typography variant="h6">Data Yok</Typography>
            )}
          </Grid>
        </Grid>
        <Grid mt={3}>
          <Grid>
            <Typography
              textAlign={'center'}
              fontSize={30}
              fontWeight={700}
              color={'#73EC8B'}
              sx={{ borderBottom: '5px solid #73EC8B', mb: 2, padding: '5px 0px' }}
            >
              Kanatlı Hammadde
            </Typography>
          </Grid>
          <Grid display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'}>
            {Array.isArray(siloData[0]) && siloData[0].length > 0 ? (
              siloData[0]
                .filter((x) => x.SiloGrubuAd == 'KANATLI HAMMADE')
                .map((silo) => (
                  <button
                    style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}
                    onClick={() => handleOpenDialog(silo)}
                    key={silo.Id}
                  >
                    <Silo
                      width={'124px'}
                      height={'184px'}
                      color={silo.Color}
                      siloName={silo.SiloName}
                      seviye={silo.Miktar < 1 || silo.Kapasite < 1 ? 0 : (silo.Miktar * 100) / silo.Kapasite}
                      stokName={silo.StokName}
                      miktar={silo.Miktar}
                      kapasite={silo.Kapasite}
                    />
                  </button>
                ))
            ) : (
              <Typography variant="h6">Data Yok</Typography>
            )}
          </Grid>
        </Grid>
        <Grid mt={3}>
          <Grid>
            <Typography
              textAlign={'center'}
              fontSize={30}
              fontWeight={700}
              color={'#FF8C9E'}
              sx={{ borderBottom: '5px solid #FF8C9E', mb: 2, padding: '5px 0px' }}
            >
              Kanatlı Premix
            </Typography>
          </Grid>
          <Grid display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'}>
            {Array.isArray(siloData[0]) && siloData[0].length > 0 ? (
              siloData[0]
                .filter((x) => x.SiloGrubuAd == 'KANATLI PREMIX')
                .map((silo) => (
                  <button
                    style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}
                    onClick={() => handleOpenDialog(silo)}
                    key={silo.Id}
                  >
                    <Silo
                      width={'124px'}
                      height={'184px'}
                      color={silo.Color}
                      siloName={silo.SiloName}
                      seviye={silo.Miktar < 1 || silo.Kapasite < 1 ? 0 : (silo.Miktar * 100) / silo.Kapasite}
                      stokName={silo.StokName}
                      miktar={silo.Miktar}
                      kapasite={silo.Kapasite}
                    />
                  </button>
                ))
            ) : (
              <Typography variant="h6">Data Yok</Typography>
            )}
          </Grid>
        </Grid>
        <Grid mt={3}>
          <Grid>
            <Typography
              textAlign={'center'}
              fontSize={30}
              fontWeight={700}
              color={'#C7FFD8'}
              sx={{ borderBottom: '5px solid #C7FFD8', mb: 2, padding: '5px 0px' }}
            >
              Kanatlı Premix - 2
            </Typography>
          </Grid>
          <Grid display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'}>
            {Array.isArray(siloData[0]) && siloData[0].length > 0 ? (
              siloData[0]
                .filter((x) => x.SiloGrubuAd == 'KANATLI PREMIX - 2')
                .map((silo) => (
                  <button
                    style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}
                    onClick={() => handleOpenDialog(silo)}
                    key={silo.Id}
                  >
                    <Silo
                      width={'124px'}
                      height={'184px'}
                      color={silo.Color}
                      siloName={silo.SiloName}
                      seviye={silo.Miktar < 1 || silo.Kapasite < 1 ? 0 : (silo.Miktar * 100) / silo.Kapasite}
                      stokName={silo.StokName}
                      miktar={silo.Miktar}
                      kapasite={silo.Kapasite}
                    />
                  </button>
                ))
            ) : (
              <Typography variant="h6">Data Yok</Typography>
            )}
          </Grid>
        </Grid>
        <Grid mt={3}>
          <Grid>
            <Typography
              textAlign={'center'}
              fontSize={30}
              fontWeight={700}
              color={'#CFF00A'}
              sx={{ borderBottom: '5px solid #CFF00A', mb: 2, padding: '5px 0px' }}
            >
              Kanatlı Yağ
            </Typography>
          </Grid>
          <Grid display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'}>
            {Array.isArray(siloData[0]) && siloData[0].length > 0 ? (
              siloData[0]
                .filter((x) => x.SiloGrubuAd == 'KANATLI YAG')
                .map((silo) => (
                  <button
                    style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}
                    onClick={() => handleOpenDialog(silo)}
                    key={silo.Id}
                  >
                    <Silo
                      width={'124px'}
                      height={'184px'}
                      color={silo.Color}
                      siloName={silo.SiloName}
                      seviye={silo.Miktar < 1 || silo.Kapasite < 1 ? 0 : (silo.Miktar * 100) / silo.Kapasite}
                      stokName={silo.StokName}
                      miktar={silo.Miktar}
                      kapasite={silo.Kapasite}
                    />
                  </button>
                ))
            ) : (
              <Typography variant="h6">Data Yok</Typography>
            )}
          </Grid>
        </Grid>
        <Grid mt={3}>
          <Grid>
            <Typography
              textAlign={'center'}
              fontSize={30}
              fontWeight={700}
              color={'#FFEB55'}
              sx={{ borderBottom: '5px solid #FFEB55', mb: 2, padding: '5px 0px' }}
            >
              Melas
            </Typography>
          </Grid>
          <Grid display={'flex'} flexDirection={'row'} justifyContent={'center'} flexWrap={'wrap'}>
            {Array.isArray(siloData[0]) && siloData[0].length > 0 ? (
              siloData[0]
                .filter((x) => x.SiloGrubuAd == 'MELAS')
                .map((silo) => (
                  <button
                    style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}
                    onClick={() => handleOpenDialog(silo)}
                    key={silo.Id}
                  >
                    <Silo
                      width={'124px'}
                      height={'184px'}
                      color={silo.Color}
                      siloName={silo.SiloName}
                      seviye={silo.Miktar < 1 || silo.Kapasite < 1 ? 0 : (silo.Miktar * 100) / silo.Kapasite}
                      stokName={silo.StokName}
                      miktar={silo.Miktar}
                      kapasite={silo.Kapasite}
                    />
                  </button>
                ))
            ) : (
              <Typography variant="h6">Data Yok</Typography>
            )}
          </Grid>
        </Grid>
      </MainCard>

      {/* Silo Detayları */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ fontSize: 20, fontWeight: 600, color: 'white' }} textAlign={'center'}>
          Silo Detayları
        </DialogTitle>
        <DialogContent>
          {selectedSilo && (
            <Grid container>
              <Grid item mr={2}>
                <Silo
                  width={'124px'}
                  height={'194px'}
                  color={selectedSilo.Color}
                  siloName={selectedSilo.SiloName}
                  seviye={selectedSilo.Miktar < 1 || selectedSilo.Kapasite < 1 ? 0 : (selectedSilo.Miktar * 100) / selectedSilo.Kapasite}
                  stokName={selectedSilo.StokName}
                  miktar={selectedSilo.Miktar}
                  kapasite={selectedSilo.Kapasite}
                />
              </Grid>
              <Grid>
                <Grid item>
                  <Grid>
                    <Typography ml={1}>Miktar</Typography>
                  </Grid>
                  <TextField
                    value={miktar}
                    onChange={(e) => {
                      setMiktar(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item mt={1}>
                  <Grid>
                    <Typography ml={1}>Kapasite</Typography>
                  </Grid>
                  <TextField
                    value={kapasite}
                    onChange={(e) => {
                      setKapasite(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item mt={2}>
                  {/* <Button variant="outlined" fullWidth color="warning" onClick={() => UpdateSiloDozaj(selectedSilo)}>
                    Kaydet
                  </Button> */}
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
                    onClick={() => UpdateSiloDozaj(selectedSilo)}
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
