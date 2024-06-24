import React, { useState } from 'react';
import './App.css';

interface IItem {
    //* обойдемся без тайпгарда))))
    type: string;
    views: number;
}

interface IArticle extends IItem {
    title: string;
}

interface IVideo extends IItem {
    url: string;
}

type TListProps = {
    list: (IArticle | IVideo)[];
}

function withViews<T extends IItem>(Component: React.ComponentType<T>): React.ComponentType<T> {
  return class extends React.Component<T> {

      constructor(props: T) {
          super(props)

      }
      render() {
          if (this.props.views > 1000) {
              return <Popular>
                        <Component {...this.props} />
                      </Popular>
          } else if (this.props.views < 100) {
              return <New>
                        <Component {...this.props} />
                    </New>
          }
          return <Component {...this.props} />
      }
  }
}

const VideoWithViews = withViews(Video);
const ArticleWithViews = withViews(Article);

function New(props: React.PropsWithChildren): JSX.Element {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
}

function Popular(props: React.PropsWithChildren): JSX.Element {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
}

function Article(props: IArticle): JSX.Element {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
}

function Video(props: IVideo): JSX.Element {

    return (
        <div className="item item-video">
            <iframe src={props.url} style={{ border: 'none' }} allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
}

function List(props: TListProps): JSX.Element {
    return (
        <React.Fragment>
            {props.list.map((item, index) => {
                switch (item.type) {
                    case 'video':
                        return <VideoWithViews key={index} {...item as IVideo} />;
                    case 'article':
                        return <ArticleWithViews key={index} {...item as IArticle} />;
                    default: return <React.Fragment></React.Fragment>;
                }
            })}
        </React.Fragment>
    );
}

export default function App() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [list, _setList] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}
