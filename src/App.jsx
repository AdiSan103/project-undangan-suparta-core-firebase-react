import "./App.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { db } from "./service/firebase.js";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Comentar from "./components/comentar";
import imgBg1 from "./assets/img/g1.jpg";
import imgBg2 from "./assets/img/g2.jpg";
import imgBg3 from "./assets/img/g3.jpg";

function App() {
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [visitor, setVisitor] = useState("");

  const OpenLetter = () => {
    // variabel
    var audio = document.getElementById("audio");
    let i = document.querySelector(".loadingIcon2");
    let j = document.querySelector(".body");
    // action
    audio.play();
    // action
    i.classList.add("true");
    j.classList.remove("d-hidden");
    // wait
    setTimeout(() => {
      // action
      i.classList.add("d-hidden");
      // call function system2
      // system2();
    }, 1000);
  };

  const audio = () => {
    let audio = document.getElementsByTagName("audio")[0];
    let icon = document.querySelector(".audio-control i");
    if (audio.classList != "play") {
      audio.play();
      audio.classList.add("play");
      icon.classList.remove("fa-music");
      icon.classList.add("fa-volume-mute");
    } else {
      audio.pause();
      audio.classList.remove("play");
      icon.classList.add("fa-music");
      icon.classList.remove("fa-volume-mute");
    }
  };

  const timer = (date) => {
    // target day
    let timeTarget = new Date(date).getTime();
    // looping
    let thisInterval = setInterval(function () {
      // today
      let timeNow = new Date().getTime();
      // difference
      let timeDistance = timeTarget - timeNow;
      // conditional time target is true
      if (timeDistance < 0) {
        // stop Interval
        clearInterval(thisInterval);
      } else {
        // // inner in html and change time in :
        // 1.days
        document.querySelector(".days").innerHTML = Math.floor(
          timeDistance / (1000 * 60 * 60 * 24)
        );
        // 2.hours
        document.querySelector(".hours").innerHTML = Math.floor(
          (timeDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        // 3.minutes
        document.querySelector(".minutes").innerHTML = Math.floor(
          (timeDistance % (1000 * 60 * 60)) / (1000 * 60)
        );
        // 4.seconds
        document.querySelector(".seconds").innerHTML = Math.floor(
          (timeDistance % (1000 * 60)) / 1000
        );
      }
    }, 100);
  };

  const dateNow = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() returns month from 0-11
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getVisitor = () => {
    let url = new URLSearchParams(window.location.search);
    setVisitor(url.get("untuk"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title !== "" && desc !== "") {
        await addDoc(collection(db, "comments"), {
          title,
          desc,
          date: dateNow(),
        });
        // reset
        setTitle("");
        setDesc("");
        // message
        alert("Terima kasih atas ucapannya🙏😊");
      } else {
        alert("jangan lupa kirimkan nama dan pesan anda kepada kami🙏😊");
      }
    } catch {
      alert("Maaf, error pada server");
    }
  };

  useEffect(() => {
    Aos.init();
    // atur waktu, format ('tahun,bulan,hari')
    timer("2024,06,21");
    //
    getVisitor();
  });

  useEffect(() => {
    const q = query(collection(db, "comments"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let commentsArray = [];
      querySnapshot.forEach((doc) => {
        commentsArray.push({ ...doc.data(), id: doc.id });
      });
      setComments(commentsArray);
    });
    return () => unsub();
  });

  return (
    <div>
      {/* <!-- loading --> */}
      <div className="loadingIcon2 position-absolute vh-100 w-100 start">
        <div className="bg-loadingIcon2 start vh-100 w-100 d-flex justify-content-center align-items-center">
          <div className="desc-text text-center text-white numans">
            <p
              className="montserrat"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              Undangan Manusa Yadnya
              <br />
              Mepandes / Potong Gigi
            </p>
            <h2
              className="display-7 dancingscript"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              I Gusti Agung Ngurah Wighnastana Prayoga
              <br />
              I Gusti Agung Ayu Ratih Mahyuni
              <br />I Gusti Agung Inten Kesaraningrat
            </h2>
            {/* <!-- <img src="src/assets/img/asset5.png" alt="..." className="w-100 img-loading-desc"> --> */}
            <p className="mt-5 " data-aos="fade-up" data-aos-duration="1000">
              Kpd. Bpk/Ibu/Saudara/i
            </p>
            <h3 className="montserrat">{visitor}</h3>
            <p className=" mx-4">
              Tanpa Mengurangi rasa hormat, kami mengundang anda untuk hadir
              pada acara pernikahan kami.
            </p>
            {/* <!-- timer --> */}
            <div
              className="timer my-5"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="d-flex  flex-column justify-content-center">
                <div>
                  <div className=" timer-main numans h3 d-flex  justify-content-center flex-column mx-4">
                    <div className="d-flex  justify-content-center text-center  align-items-center timer-content ">
                      <div className="timer-part px-2 pt-3 me-sm-2 me-1">
                        <div className="days mb-2 fw-bolder display-6">0</div>
                        <p className="h6">Hari</p>
                      </div>
                      <div className="timer-part px-2 pt-3 ms-sm-2 me-sm-2 me-1 ">
                        <div className="hours mb-2 fw-bolder display-6">0</div>
                        <p className="h6">Jam</p>
                      </div>
                      <div className="timer-part px-2 pt-3 ms-sm-2 me-sm-2">
                        <div className="minutes mb-2 fw-bolder display-6">
                          0
                        </div>
                        <p className="h6">Menit</p>
                      </div>
                      <div className="timer-part px-2 pt-3 ms-sm-2 ms-1">
                        <div className="seconds mb-2 fw-bolder display-6">
                          0
                        </div>
                        <p className="h6">Detik</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="display-6 display-sm-4 p-3 montserrat mt-5">
              <button
                onClick={OpenLetter}
                type="button"
                className="buttonClick click border-0 p-3 fw-bold text-white"
              >
                Buka Undangan
                <i className="far fa-envelope-open"></i>
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* <!-- audio --> */}
      <div className="fixed-bottom audio shadow">
        <audio
          src="src/assets/music/BALI_WORLD_MUSIC_GUS_TEJA_FEE_WITH_LOVE.mp3"
          id="audio"
          loop
          className="play hidden"
        ></audio>
        {/* <button
          onClick={audio}
          type="button"
          className="audio-button audio-control m-2 d-flex justify-content-center align-items-center"
        >
          <i className="fas fa-volume-mute"></i>
        </button> */}
      </div>

      {/* <!-- body --> */}
      <div className="body d-hidden">
        {/* <!-- banner --> */}
        <div className="banner">
          <div className="banner-container  w-100 vh-100-2 d-flex flex-column text-center justify-content-center text-white align-items-center">
            <p className="numans p-1">
              Undangan Manusa Yadnya
              <br />
              Mepandes / Potong Gigi
            </p>
            <h1
              className="dancingscript display-7"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              I Gusti Agung Ngurah Wighnastana Prayoga
              <br />
              I Gusti Agung Ayu Ratih Mahyuni
              <br />I Gusti Agung Inten Kesaraningrat
            </h1>
            <br />
            <div className="numans ">
              <p>Putra - Putri Pasangan :</p>
              <div className="d-flex w-full gap-lg-5 gap-2">
                <div>
                  <span>I Gusti Ngurah Gede Eka Mahaputra, SH</span>
                  <br />
                  <span>&</span>
                  <br />
                  <span>I Dewa Ayu Nyoman Wahyuni, SE</span>
                </div>
                <div>
                  <span>I Gusti Agung Ngurah Alit Jelada Putra, SE</span>
                  <br />
                  <span>&</span>
                  <br />
                  <span>I Gusti Ayu Agung Ratini</span>
                </div>
              </div>
            </div>
            {/* <!-- bottom --> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="position-absolute banner-bottom"
            >
              <path
                fill="#fff"
                fillOpacity="1"
                d="M0,288L1440,192L1440,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>

        {/* <!-- content1 --> */}
        <div className="content1 container text-center d-flex flex-column justify-content-center align-items-center py-4">
          <div className="content1-content">
            <h2
              className="alexbrush display-2 color1"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              Om Swastiastu
            </h2>
            <p className="numans" data-aos="fade-up" data-aos-duration="1000">
              {" "}
              Hyang Widhi Wasa/Tuhan Yang Maha Esa kami bermaksud mengundang
              Bapak/Ibu/Saudara/i pada Upacara Manusa Yadnya Mepandes ( Potong
              Gigi ) Putra dan Putri kami.
            </p>
          </div>
        </div>

        {/* <!-- content2 --> */}
        <div className="content2 container" style={{ overflow: "hidden" }}>
          {/* <!-- pria --> */}
          <div className="content2-1 d-flex flex-md-row flex-column-reverse py-2">
            {/* <!--  --> */}
            <div
              className="col-md-7 d-flex flex-column justify-content-center align-items-center"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div>
                <h3 className="alexbrush fw-bold">Jumat, 21 Juni 2024</h3>
                <i className="nunitosans">Hari /Tanggal</i>
                <p className="montserrat fw-bold my-3">
                  11 : 00 Wita - Selesai
                </p>
                <p className="nunitosans">Waktu</p>
                <i className="montserrat fw-bold my-3">
                  Jl. Subita Gg Sudamala No. 7,
                  <br />
                  Br Abiankapas Kaja, Sumerta,Denpasar.
                </i>
                <p className="nunitosans mt-3">Tempat</p>
              </div>
            </div>
            {/* <!--  --> */}
            <div className="col-md-5 d-flex flex-column justify-content-center align-items-center position-relative">
              <div className="position-absolute content2-1-border"></div>
              <div
                className="img-content2-1 mx-4"
                data-aos="fade-up"
                data-aos-duration="1000"
              ></div>
            </div>
          </div>
          {/* <!-- wanita --> */}
          <div className=" content2-2 row py-2">
            {/* <!--  --> */}
            <div className="col-md-5 d-flex flex-column justify-content-center align-items-center position-relative">
              <div
                className="img-content2-2 mx-4"
                data-aos="fade-up"
                data-aos-duration="1000"
              ></div>
              <div className="position-absolute content2-2-border"></div>
            </div>
            {/* <!--  --> */}
            <div
              className="col-md-7 d-flex flex-column justify-content-center align-items-center"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div>
                <h3 className="playball display-3 mt-3 ">Mapandes</h3>
                <h3 className="alexbrush fw-bold">Upacara Potong Gigi</h3>
                <p className="montserrat fw-bold my-3">
                  I Gusti Agung Ngurah Wighnastana Prayoga
                </p>
                <p className="montserrat fw-bold my-3">
                  I Gusti Agung Ayu Ratih Mahyuni
                </p>
                <p className="montserrat fw-bold my-3">
                  I Gusti Agung Inten Kesaraningrat
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- content3 --> */}
        <div className="content3 w-100 my-5">
          <div className="content3-bg w-100 my-5"></div>
        </div>

        {/* <!-- content4 --> */}
        <div className="content4">
          <div className=" vh-100-2 p-md-5 p-2 d-flex justify-content-center align-items-center">
            <div
              className="content3-container "
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <p className="p-content3 text-center nunitosans mb-5 ">
                Merupakan suatu kehormatan dan kebahagiaan kami apabila
                Bapak/Ibu/saudara/i berkenan hadir memberikan doa restu.
              </p>
              <div className="content3-main text-center m-auto position-relative d-flex justify-content-center align-items-center  flex-column">
                <div
                  className="content-3-desc d-flex justify-content-center align-items-center flex-column h-100 p-5"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                >
                  <h2 className="playball pt-2 pb-3 color1 ">Om Swastiastu</h2>
                  <p
                    className="numans"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa /
                    Tuhan Yang Maha Esa, kami bermaksud menyelenggarakan Upacara
                    Manusa Yadnya Mapandes ( Potong Gigi ) putra - putri kami,
                    yang diselenggarakan pada
                  </p>
                  <div className="numans pb-4 pt-2">
                    <div className="d-flex">
                      <div className="w-custom1">Hari /Tanggal : </div>
                      <div className="w-custom2"> Jumat, 21 Juni 2024</div>
                    </div>
                    <div className="d-flex">
                      <div className="w-custom1">Waktu : </div>
                      <div className="w-custom2"> 11 : 00 Wita - Selesai</div>
                    </div>
                    <div className="d-flex">
                      <div className="w-custom1">Tempat : </div>
                      <div className="w-custom2">
                        Jl. Subita Gg Sudamala No. 7, Br Abiankapas Kaja,
                        Sumerta, Denpasar.
                      </div>
                    </div>
                    <a
                      href="https://maps.app.goo.gl/LNa8vkgieEJtEV3h9"
                      className="buttonMaps btn mt-3 fw-bolder nunitosans  text-center text-white"
                      target="_blank"
                    >
                      Lokasi Google Maps
                    </a>
                  </div>
                  <p
                    className="numans"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    Akan merupakan suatu kehormatan dan kebahagiaan bagi kami
                    apabila Bapak/Ibu/Saudara/i , berkenan hadir untuk
                    memberikan doa restu. Akan kehadiran & doa restunya, kami
                    sekeluarga mengucapkan terima kasih.
                  </p>
                  <h2 className="playball pt-2 pb-4 color1 ">
                    Om Shanti, Shanti, Shanti Om
                  </h2>
                  <div className="w-custom3 d-flex align-items-end justify-content-end">
                    <div className="d-flex flex-column align-items-start justify-content-start">
                      <span>Hormat Kami,</span>
                      <span> Kel. I Gusti Ngurah Gede Eka Mahaputra, SH</span>
                      <span> Kel. I Gusti Ngurah Ahil Jelada Putra, SE</span>
                    </div>
                  </div>
                </div>
                <div className="border-content3-desc position-absolute"> </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- content5 --> */}
        {/* <div className="content5 vh-100-2 text-center py-5 spaceMono d-flex justify-content-center align-items-center content2-content">
          <div className="content2-main m-3 p-3 container">
            <div className="content2-1  dancingscript">
              <h4
                className="fst-italic h3 "
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <span className="passionone display-1">''</span>Ihaiva stam ma
                vi yaustam, visvam ayur vyasnutam, kridantau putrair naptrbhih,
                modamanau sve grhe.
              </h4>
              <p className="fw-bold mt-3">(Rg Veda X.85.42)</p>
            </div>
            <div className="content2-2  fw-bold">
              <p className=" dancingscript my-4">Artinya</p>
              <p className="h6 nunitosans">
                Wahai pasangan suami-isteri, semoga kalian tetap bersatu dan
                tidak pernah terpisahkan. Semoga kalian mencapai hidup penuh
                kebahagiaan, tinggal di rumah yang penuh kegembiraan bersama
                seluruh keturunanmu.
              </p>
            </div>
          </div>
        </div> */}

        {/* <!-- gallery --> */}
        <div className="gallery-container vh-100-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920.5 838.5"
            className="position-absolute"
          >
            <defs></defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path
                  fill="white"
                  className="cls-1-galler-svg"
                  d="M1920,838.5,0,452.5.5,0h1920Q1920.25,419.25,1920,838.5Z"
                />
              </g>
            </g>
          </svg>
          <div className="d-flex justify-content-center  container p-2 flex-column">
            <h2
              data-aos="fade-up"
              data-aos-duration="1000"
              className="text-center dancingscript display-3 mb-5  align-items-center color1"
            >
              Momen Kami
            </h2>
            <div
              className="gallery m-auto"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div
                id="carouselExampleIndicators"
                className="carousel slide shadow p-2"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={imgBg1} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={imgBg2} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={imgBg3} className="d-block w-100" alt="..." />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- comentar --> */}
        <div className="comentar numans">
          <div className="container py-5">
            <h5 className="pb-5 dancingscript display-1 color1 text-center">
              Pesan dan Ucapan
            </h5>
            <div className="comentars">
              {comments.map((item) => (
                <Comentar
                  key={item.id}
                  title={item.title}
                  desc={item.desc}
                  date={item.date}
                />
              ))}
            </div>
            <form className="px-2" onSubmit={handleSubmit}>
              <p className="montserrat fw-bold mb-2">
                Kirimkan Ucapan Anda di bawah ini💖
              </p>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Nama Anda :</label>
              </div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
                <label>Pesan dan Ucapan : </label>
              </div>
              <button type="submit" className="btn buttonClick mt-2">
                Kirim 📩
              </button>
            </form>
          </div>
        </div>

        {/* <!-- content6--> */}
        <div className="content6 text-center pt-5">
          <h5 className="pb-5 dancingscript display-1 color1">Matur Suksma</h5>
          <p className="numans m-0">
            Undangan Digital oleh
            <a
              href="https://adisan103.github.io/disanjaya"
              className="btn text-decoration-underline"
            >
              Disanjaya.dev
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
