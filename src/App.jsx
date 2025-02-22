import { useEffect, useState } from "react";
import GornjiDeo from "./Komponente/GornjiDeo";
import stilovi from "./Komponente/stilovi.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStreetView,
  faPhone,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  faChevronCircleUp,
  faEnvelope,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import LogInDugme from "./Komponente/LogInDugme";
import PopUp from "./Komponente/PopUp";
import SignUp from "./Komponente/SignUp";
import LogIn from "./Komponente/LogIn";
import ComboBox from "./Komponente/ComboBox";
import Termin from "./Komponente/Termin";
import lista from "./Komponente/lista";



function App() {
  const [eMail, setEmaill] = useState("");
  const [engleski, setEngleski] = useState(false);
  const [localLista, setLocalLista] = useState(lista);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [sifra, setSifra] = useState("");
  const [popUpSadrzaj, setPopUpSadrzaj] = useState(undefined);
  //userName se zove userName jer me mrzi da menjam sve u logInDugmeNaziv :/
  const [userName, setUserName] = useState("Prijava");
  const [aktivnoDugme, setAktivnoDugme] = useState(0);
  const [comboBoxVrednost, setComboBoxVrednost] = useState("");
  const [naslov, setNaslov] = useState(undefined);
  const [brojTelefona, setBrojTelefona] = useState("");
  const [minuti, setMinuti] = useState(0);
  const [sati, setSati] = useState(0);
  const [datum, setDatum] = useState("");
  const handleMinuti = (e) => {
    const value = e.target.value;
    if (value === "" || isNaN(value)) {
      setMinuti(0); 
    } else {
      const numericValue = Math.max(0, Math.min(59, Number(value))); 
      setMinuti(numericValue);
    }
  };
  const handleSati = (e) => {
    const value = e.target.value;
    if (value === "" || isNaN(value)) {
      setSati(0);
    } else {
      const numericValue = Math.max(1, Math.min(18, Number(value))); 
      setSati(numericValue);
    }
  };
  const handleBroj = (e) => {
    setBrojTelefona(e.target.value);
  };
  const handleDatum = (e) => {
    setDatum(e.target.value);
  };
  const handleOtkazi = (id) => {
    const updatedTermini = localLista.filter((termin) => termin.id !== id);
    setLocalLista(updatedTermini);
  };
  const zauzetTermin = (datum, sati, minuti) => {
    return localLista.some(
      (item) =>
        item.datum === datum && item.sati === sati && item.minuti === minuti
    );
  };
  const terminUProslosti = (datum, sati, minuti) => {
    const trenutniDatum = new Date();
    const uneseniDatum = new Date(datum);
    uneseniDatum.setHours(sati);
    uneseniDatum.setMinutes(minuti);
    return uneseniDatum < trenutniDatum;
  };
  const sortirajListu = (listaZaSortiranje) => {
    return listaZaSortiranje.sort((a, b) => {
   
      const datumA = new Date(
        `${a.datum}T${String(a.sati).padStart(2, "0")}:${String(
          a.minuti
        ).padStart(2, "0")}`
      );
      const datumB = new Date(
        `${b.datum}T${String(b.sati).padStart(2, "0")}:${String(
          b.minuti
        ).padStart(2, "0")}`
      );

     
      return datumA - datumB;
    });
  };

 
  useEffect(() => {
    const sortiranaLista = sortirajListu(lista);
    setLocalLista(sortiranaLista);
  }, []);

  const handleZakazi = () => {
    const dodatakListi = {
      id: localLista.length + 1,
      userName: userName,
      usluga: comboBoxVrednost,
      datum: datum,
      sati: sati,
      minuti: minuti,
    };

    if (userName === "Prijava") {
      alert("Morate biti prijavljeni da bi ste zakazali termin");
      return;
    }

    if (sati < 8) {
      alert("Radno vreme počinje od 8 sati");
      setSati("");
      return;
    } else if (sati > 19) {
      alert("Molim vas izaberite termin pre 19h");
      setSati("");
      return;
    }

    if (comboBoxVrednost === "") {
      alert("Morate uneti uslugu");
      return;
    }

    if (brojTelefona === "") {
      alert("Morate uneti vaš broj telefona");
      return;
    }

    if (datum === "") {
      alert("Morate uneti datum termina");
      return;
    }

    if (terminUProslosti(datum, sati, minuti)) {
      alert("Ne možete zakatati termin u prošlosti");
      return;
    }

    if (zauzetTermin(datum, sati, minuti)) {
      alert("Termin je zauzet :(");
      return;
    }

    alert(`Termin zakazan u ${sati}:${minuti < 10 ? "0" : ""}${minuti}`);
    const novaLista = sortirajListu([...localLista, dodatakListi]);
    setLocalLista(novaLista);
  };
  const informacijeKorisnika = {
    ime: eMail,
    sifra: "sifra1234",
  };
 

  const sadrzajNiz = [
    <div className="divSadrzaj">
      <p className="sadrzajNaslov">O nama</p>
      <hr />
      <p className="sadrzaj">
        Geodetski biro ГЕОПЛАН osnovan je s ciljem pružanja vrhunskih geodetskih
        usluga koje zadovoljavaju najviše standarde u struci.
        <br />
        Naš tim čine iskusni geodeti sa dugogodišnjim iskustvom, posvećeni
        preciznosti i profesionalizmu u svakom projektu.
        <br />
        Koristimo najmoderniju opremu i tehnologiju kako bismo obezbedili
        pouzdane rezultate i ispunili specifične zahteve naših klijenata.
        <br /> Bez obzira na veličinu projekta, pristupamo svakom zadatku s
        istom pažnjom i posvećenošću.Kroz godine rada stekli smo poverenje
        mnogih klijenata zahvaljujući stručnosti, tačnosti i brzim rokovima.
        <br />
        Naša misija je da budemo vaš pouzdan partner u svim geodetskim
        poslovima, osiguravajući kvalitetne rezultate koji podržavaju vaše
        projekte.Verujemo u važnost preciznosti, transparentnosti i
        kontinuiranog usavršavanja, kako bismo ostali lideri u oblasti
        geodezije.
      </p>
    </div>,
    <div className="divSadrzaj">
      <p className="sadrzajNaslov">Kontakt</p>
      <hr />
      <p className="sadrzaj">
        <FontAwesomeIcon icon={faEnvelope} /> Email - geoplancacak@mts.rs /
        milan.geoplan@gmail.com
        <br />
        <FontAwesomeIcon icon={faPhone} style={{ marginTop: "10px" }} /> Tel/Fax
        - 032/341 368 /// 064/133 71 58
        <br />
        <FontAwesomeIcon
          icon={faStreetView}
          style={{ marginTop: "10px" }}
        />{" "}
        Ulica -32000 Čačak, Kralja Petra I br.30
        <br />
        <FontAwesomeIcon icon={faMap} style={{ marginTop: "10px" }} /> Lokacija:
        <center>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2875.1868052831746!2d20.345789348121226!3d43.8933976209781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4757721121a7b28b%3A0x4c37e4ab230a399f!2zR2VvUGzQsG4!5e0!3m2!1ssr!2srs!4v1736286608564!5m2!1ssr!2srs"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Lokacija"
          ></iframe>
        </center>
      </p>
    </div>,
    <div className="divSadrzaj">
      <p className="sadrzajNaslov">Usluge</p>
      <hr />
      <p className="sadrzaj">
        Dobrodošli u naš biro, gde spoj geodezije i arhitekture donosi precizna
        i kreativna rešenja za vaš prostor.
        <br /> Naš biro pruža sveobuhvatne geodetske usluge koje garantuju
        preciznost i pouzdanost u svakom projektu.
      </p>
      <p className="sadrzaj" style={{ marginTop: "-30px" }}>
        Nudimo:
        <ul style={{ marginLeft: "50px" }}>
          {" "}
          <li> Projekte geodetskog obeležavanja</li>
          <li>Parcelaciju i fizičke deobe</li>
          <li> Snimanje objekata i izvedenog stanja </li>
          <li> Sudska veštačenja</li>
          <li>Omeđavanja</li>
          <li> Izradu geodetskih podloga za projektovanje </li>
          <li> Prenošenje projektovanog stanja na teren</li>
        </ul>
      </p>
      <p className="sadrzaj" style={{ marginTop: "-30px" }}>
        Pored geodetskih usluga, pružamo i širok spektar arhitektonskih usluga:
        <ul style={{ marginLeft: "50px", marginBottom: "10px" }}>
          <li> Idejna rešenja za sve tipove objekata</li>{" "}
          <li>
            {" "}
            Izrada tehničke dokumentacije za objekte i parterno uređenje{" "}
          </li>
          <li>
            {" "}
            Izrada izveštaja o zatečenom stanju objekta za potrebe ozakonjenja
            objekta
          </li>{" "}
          <li> Projektovanje enterijera prilagođeno vašim potrebama</li>
        </ul>{" "}
        Naš tim kombinuje tehničku preciznost i kreativnost kako bi svaki
        projekat bio funkcionalan, estetski usklađen i u skladu sa svim
        propisima. <br/>Bilo da vam je potrebna pravna sigurnost vaše nepokretnosti,
        izrada projekata ili terenski radovi visoke tačnosti, naš tim stoji vam
        na raspolaganju.
      </p>
    </div>,
    <div className="divSadrzaj">
      {userName === "Prijava" ? (
        <br />
      ) : (
        <p className="sadrzaj">
          Morate biti prijavljeni da bi ste zakazali termin.
        </p>
      )}
    </div>,
  ];

  const [sadrzaj, setSadrzaj] = useState(
    <div className="divSadrzaj">
      <p className="sadrzaj" style={{textAlign:"center"}}>
        <FontAwesomeIcon icon={faChevronCircleUp}  style={{marginRight:"5px"}}/>
        {"     "}Izaberite jednu od opcija{"     "}
        <FontAwesomeIcon icon={faChevronCircleUp}  style={{marginLeft:"5px"}} />
      </p>
    </div>
  );
  const [animate, setAnimate] = useState(false);
  const forma = (
    <div className="divSadrzaj">
      <div className="zakazivanjeDiv">
        <label className="zakazivanjeLabel">Vrsta usluge:</label>
        <ComboBox
          vrednost={comboBoxVrednost}
          setVrednost={setComboBoxVrednost}
        />
        <br />
        <br />
        <label className="zakazivanjeLabel">Broj telefona:</label>
        <input
          className="zakazivanjeDatum"
          style={{
            appearance: "textfield", // Cross-browser support for most browsers
            MozAppearance: "textfield", // Firefox-specific
            WebkitAppearance: "none", // WebKit-based browsers
          }}
          onChange={handleBroj}
          value={brojTelefona}
          placeholder="Unesite vaš broj telefona"
        ></input>
        <br />
        <br />
        <label className="zakazivanjeLabel">Datum:</label>
        <input
          type="date"
          value={datum}
          className="zakazivanjeDatum"
          onChange={handleDatum}
        ></input>
        <label className="zakazivanjeLabel" style={{ marginLeft: "10px" }}>
          Vreme:
        </label>
        <input
          min={8}
          max={18}
          className="zakazivanjeDatum"
          value={sati}
          onChange={handleSati}
          style={{ width: "50px" }}
          type="number"
        ></input>
        {"  "}
        <font style={{ fontSize: "30px" }}>:</font>
        <input
          className="zakazivanjeDatum"
          value={minuti}
          onChange={handleMinuti}
          style={{ width: "50px" }}
          type="number"
        ></input>
        {"  "}
        <center>
          <button
            className="popUpDugme"
            style={{ marginTop: "20px" }}
            onClick={handleZakazi}
          >
            <FontAwesomeIcon icon={faCheck} /> Potvrdi
          </button>
        </center>
      </div>
    </div>
  );
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timeout);
  }, [sadrzaj]);
  useEffect(() => {
    console.log("eMail value changed:", eMail); // Logs the value every time it changes
    console.log("Vrednost objekta se promenio", informacijeKorisnika.ime);
  }, [eMail, informacijeKorisnika.ime]);
  useEffect(() => {
    if (minuti < 0) {
      setMinuti(0);
    }
    console.log(sati, ":", minuti);
  }, [sati, minuti]);

  return (
    <div>
      {openPopUp && (
        <PopUp
          naslov={naslov}
          setOpenPopUp={setOpenPopUp}
          sadrzaj={popUpSadrzaj}
        />
      )}

      <header>
        <GornjiDeo
          slika="GeoPlanLogo.png"
          aktivno={aktivnoDugme}
          setAktivno={setAktivnoDugme}
          sadrzaj={sadrzajNiz}
          setSadrzaj={setSadrzaj}
        />
        <div>
       
        </div>
        <LogInDugme
          logIn={
            <LogIn
              userName={eMail}
              password={sifra}
              setUserName={setUserName}
              setOpenPopUp={setOpenPopUp}
            />
          }
          signUp={
            <SignUp
              eMail={eMail} // Pass eMail state from App
              setEmaill={setEmaill}
              setSifra={setSifra}
            />
          }
          open={openPopUp}
          naslov={naslov}
          userName={userName}
          setUserName={setUserName}
          setOpenPopUp={setOpenPopUp}
          setSadrzaj={setPopUpSadrzaj}
          setNaslov={setNaslov}
        /> 
      </header>
      <br />
      <main>
        <div className={`divCentriranje ${animate ? "animate" : ""}`}>
          {aktivnoDugme === 4 ? forma : sadrzaj}
        </div>
        {aktivnoDugme === 4 ? (
          <div className={`divCentriranje ${animate ? "animate" : ""}`}>
            <p
              className="sadrzajNaslov"
              style={{
                color: "white",
                backgroundColor: "rgb(46, 60, 70, 0.7)",
                textAlign: "center",
                borderRadius: "10px",
                padding: "15px",
              }}
            >
              Zakazani termini
            </p>
          </div>
        ) : undefined}
        {aktivnoDugme === 4 ? (
          <div className={`divCentriranje ${animate ? "animate" : ""}`}>
            <div className="parentContainer">
              <div className="terminList">
                {localLista.map((item) => (
                  <Termin
                    id={item.id}
                    key={item.id}
                    usluga={item.usluga}
                    datum={item.datum}
                    userName={item.userName}
                    sati={item.sati}
                    minuti={item.minuti}
                    ime={userName}
                    handleOtkazi={handleOtkazi}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : undefined}
      </main>
 
    </div>
  );
}

export default App;
