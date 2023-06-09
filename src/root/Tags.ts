import { ITagAttributes, Element, Tree } from './NTree';

export class Tags {
  private tree: Tree;
  public root: Tree['root'];
  public tag: Tree['tag'];
  constructor(tree: Tree) {
    this.tree = new Tree({
      makeElement: (tag) => document.createElement(tag),
    });
    this.root = (args) => this.tree.root(args);
    this.tag = (args) => this.tree.tag(args);
  }

  public text(
    key: string,
    opts: {
      text: string;
      className?: string;
      style?: string;
      getNode?: (e: HTMLElement) => void;
      onClick?: (e) => void;
    }
  ) {
    return this.tree.tag({
      tagName: 'p',
      child: opts.text,
      key: key,
      getNode: opts.getNode,
      attributes: {},
      eventListeners: opts.onClick
        ? {
            click: opts.onClick,
          }
        : undefined,
    });
  }

  public headerText(
    key: string,
    opts: {
      text: string;
      size?: number;
      className?: string;
      style?: string;
      getNode?: (e: HTMLElement) => void;
      onClick?: (e) => void;
    }
  ) {
    return this.tree.tag({
      tagName: `h${opts.size || 1}`,
      child: opts.text,
      key: key,
      getNode: opts.getNode,
      attributes: {},
      eventListeners: opts.onClick
        ? {
            click: opts.onClick,
          }
        : undefined,
    });
  }

  public div(
    key: string,
    opts: {
      child?: Array<Element | null> | Element | string | null;
      className?: string;
      style?: string;
      getNode?: (e: HTMLElement) => void;
      onClick?: (e) => void;
    }
  ) {
    return this.tree.tag({
      tagName: 'div',
      child: opts.child || ('' as string),
      key: key,
      getNode: opts.getNode,
      attributes: {
        class: opts.className,
      },
      eventListeners: opts.onClick
        ? {
            click: opts.onClick,
          }
        : undefined,
    });
  }

  public button = (
    key: string,
    opts: {
      child?: Element | string;
      className?: string;
      style?: string;
      getNode?: (e: HTMLElement) => void;
      onClick?: (e) => void;
    }
  ) =>
    this.tag({
      tagName: 'button',
      child: opts.child || '',
      key: key,
      getNode: opts.getNode,
      attributes:
        opts && opts.className
          ? {
              class: opts.className,
            }
          : {},
      eventListeners: opts.onClick
        ? {
            click: opts.onClick,
          }
        : undefined,
    });
  public textArea(
    key: string,
    opts?: {
      value?: string;
      onChange?: (e) => void;
      onFocus?: (e) => void;
      placeholder?: string;
      pattern?: string;
      disabled?: boolean;
      className?: string;
      style?: string;
      getNode?: (e: HTMLElement) => void;
    }
  ) {
    return this.tree.tag({
      tagName: 'textarea',
      child: '',
      eventListeners:
        opts && opts.onChange
          ? {
              change: opts.onChange,
            }
          : undefined,
      key: key,
      getNode: opts && opts.getNode ? opts.getNode : undefined,
      attributes: {
        class: opts && opts.className ? opts.className : undefined,
        value: opts && opts.value ? opts.value : undefined,
      },
    });
  }

  public textInput(
    key: string,
    opts?: {
      value?: string;
      onChange?: (e) => void;
      onFocus?: (e) => void;
      placeholder?: string;
      pattern?: string;
      disabled?: boolean;
      type?: 'text' | 'password';
      className?: string;
      style?: string;
      getNode?: (e: HTMLElement) => void;
    }
  ) {
    return this.tree.tag({
      tagName: 'input',
      child: '',
      eventListeners:
        opts && opts.onChange
          ? {
              change: opts.onChange,
            }
          : undefined,
      key: key,
      getNode: opts && opts.getNode ? opts.getNode : undefined,
      attributes: {
        class: opts && opts.className ? opts.className : undefined,
        value: opts && opts.value ? opts.value : undefined,
      },
    });
  }
}
