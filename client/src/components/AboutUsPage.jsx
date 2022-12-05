import './AboutUsPage.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const boxVariant = {
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0, x: 200 },
};

const Box = ({ content }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start('visible');
    } else {
      control.start('hidden');
    }
  }, [control, inView]);

  return (
    <motion.div
      className="box"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
      <div>{content} </div>
    </motion.div>
  );
};

function First() {
  return (
    <section>
      <h1>Hello everyone!</h1>
      <p>This is our website</p>
      <p>We hope you enjoyed our project and presentation!</p>
    </section>
  );
}

function Second() {
  return (
    <section className="box section__images">
      <h2>This is the dev stack we've used to develop it</h2>
      <img
        src="https://github.com/iKayden/doable/blob/kayden/about-ut-page/client/public/express_js.png?raw=true"
        alt="express-logo"
      ></img>
      <img
        src="https://github.com/iKayden/doable/blob/kayden/about-ut-page/client/public/JavaScript-logo.png?raw=true"
        alt="js-logo"
      ></img>
      <img
        src="https://github.com/iKayden/doable/blob/kayden/about-ut-page/client/public/node-js-ico.jpg?raw=true"
        alt="nodejs-logo"
      ></img>
      <img
        src="https://res.cloudinary.com/practicaldev/image/fetch/s--qo_Wp38Z--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/e0nl7ziy1la7bpwj7rsp.png"
        alt="react-logo"
      ></img>
    </section>
  );
}

function Third() {
  return (
    <section>
      <h2>This is our amazing team</h2>
      <img
        className="about-us_group-photo"
        src="https://img.freepik.com/free-photo/successful-happy-business-team_53876-20936.jpg?w=2000"
        alt="our-team"
      ></img>
    </section>
  );
}

function Fourth() {
  return (
    <section className="about-us__our-stories hidden">
      <h3>Our stories</h3>
      <h2>Eileen</h2>
      <img
        className="about-us__first-picture"
        src="https://images.squarespace-cdn.com/content/v1/5ca268ee01232c1d4131debd/1635466037445-MZYSB3WNAHHLAV3KGVBE/unsplash-image-yMSecCHsIBc.jpg?format=1500w"
        alt="eileen"
      ></img>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla est
        officia, expedita vitae illum eum laboriosam! Ut obcaecati pariatur
        laborum eius natus quos, tempora nam corrupti inventore libero
        distinctio fugiat.
      </p>
    </section>
  );
}

function Fifth() {
  return (
    <section className="about-us__our-stories">
      <h2>Rosanna</h2>
      <img
        className="about-us__second-picture"
        src="https://i.pinimg.com/474x/71/11/5b/71115b2c2b4823d55818c52fa75ab125.jpg"
        alt="rosanna"
      ></img>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla est
        officia, expedita vitae illum eum laboriosam! Ut obcaecati pariatur
        laborum eius natus quos, tempora nam corrupti inventore libero
        distinctio fugiat.
      </p>
    </section>
  );
}
function Sixth() {
  return (
    <section className="about-us__our-stories hidden">
      <h2>Kayden</h2>
      <img
        className="about-us__third-picture"
        src="https://i.pinimg.com/originals/6c/51/63/6c5163a050ab57480410ea9a56a3ca93.jpg"
        alt="kayden"
      ></img>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla est
        officia, expedita vitae illum eum laboriosam! Ut obcaecati pariatur
        laborum eius natus quos, tempora nam corrupti inventore libero
        distinctio fugiat.
      </p>
    </section>
  );
}
function Seventh() {
  return (
    <section className="hidden">
      <h1>Thank you for your time and attention</h1>
      <img
        className="about-us__closeup-picture"
        src="https://images.hindustantimes.com/img/2021/11/21/1600x900/Cats_if_i_fits_i_sits_video_Instagram_1637494724139_1637494737839.PNG"
        alt="team"
      ></img>
    </section>
  );
}

export default function AboutUsPage() {
  return (
    <>
      <div className="inside-about-us__wrapper">
        <Box content={<First />} />
        <Box content={<Second />} />
        <Box content={<Third />} />
        <Box content={<Fourth />} />
        <Box content={<Fifth />} />
        <Box content={<Sixth />} />
        <Box content={<Seventh />} />
      </div>
    </>
  );
}
