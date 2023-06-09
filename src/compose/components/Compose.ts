import { IState } from '../../_redux/types';
import './Compose.less';
import { Reflexio } from '../../root-redux/reflector';
import { Tree } from '../../root/NTree';
import { Tags } from '../../root/Tags';

const reflexio = new Reflexio<{
  subject: string;
  body: string;
  to: string;
}>();
const tree = new Tree({
  makeElement: (tag) => document.createElement(tag),
});
const tags = new Tags(tree);
export const Compose = () => {
  const { state, trigger } = reflexio.useReflexio(
    (state: IState) => ({
      subject: state.compose.subject,
      body: state.compose.body,
      to: state.compose.to,
    }),
    Compose
  );

  const { subject, body, to } = state;
  console.log('composeRender');

  return tags.root({
    onMount: () => {
      console.log('onmmmm');
      trigger('openPopup', 'init', {
        message: 'Вы уверены ?',
        yesCb: () => trigger('preventClose', 'clear', null),
        noCb: () => trigger('openPopup', 'close', null),
        cancelCb: () => console.log('cancel'),
      });
    },
    key: 'compose_key',
    attributes: {
      class: 'popupwindow',
    },
    child: [
      tags.div('compose_root_key', {
        className: 'root',
        child: [
          tags.div('compose_wrap_key', {
            className: 'composeWrap',
            child: [
              tags.div('subject_div_key', {
                className: 'subject',
                child: tags.textInput('subject_input_key', {
                  className: 'textInput',
                  value: state.subject,
                  onChange: (e) =>
                    trigger('setContent', 'syncForm', {
                      input: 'subject',
                      text: e.target.value,
                    }),
                }),
              }),
              tags.textArea('body_area_key', {
                className: 'body',
                value: state.body,
                onChange: (e) =>
                  trigger('setContent', 'syncForm', {
                    input: 'body',
                    text: e.target.value,
                  }),
              }),
            ],
          }),
          tags.div('button_group_key', {
            className: 'composeButtonsGroup',
            child: [
              tags.button('submit_letter_btn_key', {
                child: 'Сохранить',
                className: 'composeButtonsGroupItm',
                onClick: () => trigger('submitLetter', 'init', null),
              }),
              tags.button('close_btn_key', {
                child: 'Закрыть',
                className: 'composeButtonsGroupItm',
                onClick: () => trigger('setContent', 'closeWindow', null),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
