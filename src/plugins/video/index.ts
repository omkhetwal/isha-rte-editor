import './index.css';

interface IData {
  hls: string;
  dash: string;
  youtube: string;
}

export default class Video {
  data: { hls: string; dash: string; youtube: string };
  nodes: { container: any; hlsInput: any; dashInput: any; youtubeInput: any };
  props: {};
  constructor(props: { data: IData; config: any }) {
    this.props = props;
    const { data } = props;
    this.data = {
      hls: data?.hls ?? '',
      dash: data?.dash ?? '',
      youtube: data?.youtube ?? '',
    };
    this.nodes = {
      container: null,
      hlsInput: null,
      dashInput: null,
      youtubeInput: null,
    };
  }

  // @ts-ignore
  static get toolbox() {
    return {
      title: 'Stream',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" style="width:20px;height:20px" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>`,
    };
  }

  render() {
    const container = document.createElement('div');
    const containerStyles = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#efefef',
      zIndex: '20',
      padding: '24px',
      margin: '.5rem',
    };

    Object.assign(container.style, containerStyles);

    const hlsBox = document.createElement('input');
    hlsBox.placeholder = 'HLS Source';

    const dashBox = document.createElement('input');
    dashBox.placeholder = 'DASH Source';

    const youtubeBox = document.createElement('input');
    youtubeBox.placeholder = 'YOUTUBE Source';

    hlsBox.classList.add('url-input');
    dashBox.classList.add('url-input');
    youtubeBox.classList.add('url-input');
    container.appendChild(hlsBox);
    container.appendChild(dashBox);
    container.appendChild(youtubeBox);

    localStorage.getItem('enable-rte-logs') &&
      console.log('data--- ', this.data, this.props);
    hlsBox.value = this.data.hls;
    dashBox.value = this.data.dash;
    youtubeBox.value = this.data.hls;

    this.nodes.hlsInput = hlsBox;
    this.nodes.dashInput = dashBox;
    this.nodes.youtubeInput = youtubeBox;

    return container;
  }

  save() {
    this.data.dash = this.nodes.dashInput.value;
    this.data.hls = this.nodes.hlsInput.value;
    this.data.youtube = this.nodes.youtubeInput.value;
    console.log(this.data, 'check if it is updating the values 👉');
    return {
      ...this.data,
    };
  }
}
