import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import Wrapper from "../components/Wrapper/Wrapper";
import Card from "../components/Card/Card";
import FormSearch from "../components/FormSearch/FormSearch";

import { _myFav } from "../types";
export interface ImgData {
  largeImageURL: string;
  pageURL: string;
  user: string;
}

interface resData {
  title: string;
  photos: ImgData[];
}

const Home = () => {
  const [query, setQuery] = useState("covid, silicon valley, computer");
  const [favoris, setFavoris] = useState<Array<_myFav>>([]);
  const [searchResulst, setSearchResulst] = useState<resData[]>([]);

  const urlBuilder = (query: string) => {
    let cleanQuery = query.replace(/ /g, "+");

    const key = "18992981-a4be0aaec3c7abcbbb0667425";
    const type = "photo";
    const url = `https://pixabay.com/api/?key=${key}&image_type=${type}&q=${cleanQuery}`;

    return url;
  };

  const fetchHelper = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  };

  const handleGetImages = async () => {
    const querys = query
      .split(",")
      .filter((q) => q !== "" && q !== " " && q)
      .map((q) => {
        if (q[0] === " ") {
          return q.slice(1);
        }
        return q;
      });

    const urls = querys.map((query) => urlBuilder(query));
    if (urls.length > 0) {
      Promise.all(urls.map((url) => fetchHelper(url))).then((res) => {
        const data = res.map((item, index) => {
          const album = {
            title: querys[index],
            photos: item.hits,
          };
          return album;
        });
        if (storedData) {
              setFavoris(JSON.parse(storedData))
        }

        setSearchResulst(data);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleGetImages();
  };

const storedData = localStorage.getItem('favoris')
  useEffect(() => {
    handleGetImages();
    
/*     if (storedData) {
      JSON.parse(storedData).map((data: any) => {
          setFavoris([...favoris, data])
      }) */
        // setFavoris([...favoris, JSON.parse(storedData)]) 
  /*      }  */  
/*     if (favoris) {
      setFavoris(favoris);
    } */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const addPictureToFav = (newFav: _myFav) => {
    let add = true;

    favoris.find((element) => {
      if (element.id === newFav.id) add = false;
    });
    if (add === true) {
      setFavoris([...favoris, newFav]);
      localStorage.setItem('favoris', JSON.stringify([...favoris, newFav]));
    }
    
  };

  return (
    <>
      {navigator.onLine ? (
        <div style={{ color: "green", fontWeight: "bold" }}>
          Vous êtes en ligne{" "}
        </div>
      ) : (
        <div style={{ color: "red", fontWeight: "bold" }}>
          Vous êtes hors-ligne
        </div>
      )}
      <Banner
        title="YnovGalery!"
        description="Cette app utilise Pixabay API."
      />
      <Card
        title="Mode d'emploi?"
        description='🎉 Séparez par "," chaque recherche. Vous pouvez chercher plusieurs catégories d`images en même temps. Exemple: "chiens, rose jaune, voiture rouge" 🎉, Selectionnez une image pour afin de l`ajouter à vos favoris.'
      >
        <FormSearch
          value={query}
          handleOnChange={handleOnChange}
          handleSubmit={handleSubmit}
        />
      </Card>
      <Wrapper>
        {favoris.length ? (
          <Card
            slider
            description="Retrouvez ici les images que vous avez ajouter à vos favoris."
            title="FAVORIS"
            photos={favoris}
          />
        ) : (
          <></>
        )}
        {searchResulst.map((item, index) => (
          <Card
            key={index}
            slider
            title={item.title}
            photos={item.photos}
            addPictureToFav={addPictureToFav}
          />
        ))}
      </Wrapper>
    </>
  );
};

export default Home;
