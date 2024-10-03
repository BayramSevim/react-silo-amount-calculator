import { Grid } from '@mui/material';
import React, { useMemo } from 'react';

export const Silo = ({ width, height, color, siloName, seviye, stokName, miktar, kapasite }) => {
  // const stokName = 'bayramsevimsedat-davrandeniz-123hanramazanbayborek'.toUpperCase();
  const fullHeight = 113;

  const fillHeight = useMemo(() => {
    const adjustedSeviye = Math.max(0, Math.min(110, seviye));
    return (fullHeight * adjustedSeviye) / 110;
  }, [seviye]);

  return (
    <>
      <Grid item>
        <svg
          version="1.1"
          width={width}
          height={height}
          viewBox="0 0 65.649 112.5"
          enableBackground="new 0 0 65.649 112.5"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ana silo yapısı */}
          <g id="Group_TankBody" transform="matrix(1.818552,0,0,1.1979168,-26.822723,-22.265054)">
            <path fill={color ? color : '#45474B'} d="M 1.689,103.54153 H 63.848 L 42.227,112.497 H 23.31 L 1.689,103.62942" />
            <path fill="gray" d="M 1.689,103.67577 V 18.809 h 62.159 v 84.86801 H 1.689" />
          </g>

          {/* Doluluk kısmı */}
          <g id="FillSection">
            <rect x="-7" y={103 - fillHeight} width="100" height={fillHeight} fill={color ? color : '#45474B'} />

            {/* Dalga efekti */}
            <path
              d={`M 0 ${103 - fillHeight + 3} Q 10 ${103 - fillHeight + 1} 20 ${103 - fillHeight} T 40 ${103 - fillHeight} T 60 ${103 - fillHeight + 1} T 80 ${103 - fillHeight + 2} T 100 ${103 - fillHeight + 2}`}
              fill={color ? color : '#45474B'}
              stroke={color ? color : '#45474B'}
              strokeWidth="2"
              style={{
                animation: 'waveAnimation 6s linear infinite'
              }}
            />
          </g>

          {/* Yüzde gösterimi */}
          <text fontSize={'10px'} fill="black">
            <tspan fontWeight={800} fontSize={'8px'} textAnchor="middle" x="33" y="9">
              Kapasite
            </tspan>
            <tspan fontWeight={800} fontSize={'8px'} textAnchor="middle" x="33" y="10">
              _________________
            </tspan>
            <tspan fontWeight={800} textAnchor="middle" x="33" y="21">
              {new Intl.NumberFormat('tr-TR').format(kapasite)} KG
            </tspan>
          </text>

          <text fontSize={'8px'} fill="black">
            {/* İlk satır */}
            <tspan fontWeight={700} textAnchor="middle" x="34" y="44.406408">
              {stokName.length > 12 ? stokName.slice(0, 12) : stokName} {/* 10 karakterden fazlaysa kes */}
            </tspan>
            {/* İkinci satır, eğer stokName uzun ise */}
            {stokName.length > 12 && (
              <tspan fontWeight={700} textAnchor="middle" x="32" y="53.406408">
                {stokName.slice(12, 22)} {/* 10 karakterden sonrası */}
              </tspan>
            )}
            {stokName.length > 22 && (
              <tspan fontWeight={700} textAnchor="middle" x="32" y="63.406408">
                {stokName.slice(22, 32)} {/* 10 karakterden sonrası */}
              </tspan>
            )}
          </text>

          <text fontSize={'8px'} fill="black">
            <tspan fontWeight={700} fontSize={'7px'} textAnchor="middle" x="32" y="78">
              Miktar
            </tspan>
            <tspan fontWeight={800} fontSize={'7px'} textAnchor="middle" x="32" y="79">
              _________________
            </tspan>
            <tspan fontWeight={800} textAnchor="middle" x="32" y="90">
              {new Intl.NumberFormat('tr-TR').format(miktar)} KG
            </tspan>
          </text>

          <text fontSize={'8px'} fill="black">
            <tspan fontWeight={800} textAnchor="middle" x="38" y="106">
              {new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(seviye)} %
            </tspan>
          </text>

          {/* Animasyon tanımı */}
          <style>
            {`
              @keyframes waveAnimation {
                0% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-2px);
                }
                100% {
                  transform: translateY(0);
                }
              }
            `}
          </style>
        </svg>
      </Grid>
      <Grid textAlign={'center'} mt={1} mb={1} fontWeight={700}>
        {siloName}
      </Grid>
    </>
  );
};
