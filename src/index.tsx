// @ts-nocheck

// eslint-disable-next-line no-unused-vars
import EditorJS from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import List from '@editorjs/list';

import Paragraph from 'editorjs-paragraph-with-alignment';
import ColorPlugin from 'editorjs-text-color-plugin';
import * as React from 'react';
import { useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import fontSizePlugin from './plugins/fontSize';
import Video from './plugins/video';
import SimpleImage from './plugins/image';
import './style.css';

interface IProps {
  onChange: (a: any) => void;
  containerClass?: string;
  editorId: string;
}

const tools = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },

  list: {
    class: List,
    inlineToolbar: true,
  },
  Color: {
    class: ColorPlugin,
    config: {
      colorCollections: [
        '#FF1300',
        '#EC7878',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#0070FF',
        '#03A9F4',
        '#00BCD4',
        '#4CAF50',
        '#8BC34A',
        '#CDDC39',
        '#FFF',
        '#000',
      ],
      defaultColor: '#FF1300',
      type: 'text',
    },
  },
  // textAlign: TextAlign,
  embed: Embed,
  image: SimpleImage,
  video: Video,
  fontSize: fontSizePlugin,
};

const RteEditor = (props: IProps, ref: any) => {
  const { onChange, containerClass, editorId } = props;
  const logLevel = localStorage.getItem('enable-rte-logs')
    ? 'VERBOSE'
    : 'ERROR';

  const editorRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    loadData: (data) => {
      // setEditorData(data);
      if (editorRef?.current) {
        editorRef?.current?.destroy();
      }
      const editor = new EditorJS({
        holder: editorId,
        data: data,
        logLevel: logLevel,
        onReady: () => {
          editorRef.current = editor;
          editor.saver.save();
        },
        onChange: async () => {
          const content = await editor.save();
          onChange(content);
        },
        autofocus: true,
        tools,
      });
    },
    getData: () => {
      return editorRef.current.save();
    },
  }));

  const initEditor = useCallback(() => {
    const editor = new EditorJS({
      holder: editorId,
      logLevel: logLevel,
      data: null,
      onReady: () => {
        editorRef.current = editor;
      },
      onChange: async () => {
        const content = await editor.save();
        onChange(content);
      },
      autofocus: true,
      tools,
    });
  }, []);

  useEffect(() => {
    //destroy if exists
    if (!editorRef.current) {
      initEditor();
    }
    return () => {
      // eslint-disable-next-line no-unused-expressions
      if (editorRef?.current) {
        editorRef?.current?.destroy?.();
      }
      editorRef.current = undefined;
    };
  }, []);

  return (
    <div className={`${containerClass ? containerClass : 'defaultContainer'} `}>
      <div className={'editorHolder'} id={editorId} />
    </div>
  );
};

export default React.forwardRef(RteEditor);
