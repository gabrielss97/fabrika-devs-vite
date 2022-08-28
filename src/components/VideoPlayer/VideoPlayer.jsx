// Styles
import styles from './VideoPlayer.module.scss';

const VideoPlayer = () => {
  return (
    <div className={styles.video_player}>
      <h1>VIDEO</h1>

      <button className='btn'>Baixar arquivos</button>
      <h2>Descrição:</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        laudantium perferendis officia expedita esse, repellat modi ullam id
        possimus harum voluptatem qui distinctio sint culpa nihil veniam itaque.
        Fugiat, repudiandae.
      </p>
    </div>
  );
};

export default VideoPlayer;
