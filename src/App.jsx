import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import {
  ArrowDownWideNarrow,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Clapperboard,
  Clock3,
  Compass,
  Film,
  Info,
  Play,
  Plus,
  Search,
  Star,
  Tv,
  X,
} from 'lucide-react'
import './App.css'

const artwork = (path, size = 'w500') => path.startsWith('http') ? path : `https://image.tmdb.org/t/p/${size}/${path}`

const titles = [
  {
    id: 'dune-two', title: 'Dune: Part Two', year: 2024, rating: 'PG-13', score: '8.8',
    duration: '2h 46m', type: 'Movie', genre: 'Sci-fi',
    poster: '1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop: 'xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    tag: 'EDITOR\'S PICK',
  },
  {
    id: 'poor-things', title: 'Poor Things', year: 2023, rating: 'R', score: '7.8',
    duration: '2h 21m', type: 'Movie', genre: 'Drama',
    poster: 'kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
    backdrop: 'kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
    description: 'The incredible tale and fantastical evolution of Bella Baxter, a young woman brought back to life by an unorthodox scientist.',
    tag: 'AWARD WINNER',
  },
  {
    id: 'past-lives', title: 'Past Lives', year: 2023, rating: 'PG-13', score: '7.9',
    duration: '1h 46m', type: 'Movie', genre: 'Romance',
    poster: 'k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
    backdrop: 'k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
    description: 'Two deeply connected childhood friends are wrested apart after one family emigrates from South Korea.',
    tag: 'QUIETLY MOVING',
  },
  {
    id: 'oppenheimer', title: 'Oppenheimer', year: 2023, rating: 'R', score: '8.3',
    duration: '3h 00m', type: 'Movie', genre: 'Drama',
    poster: 'ptpr0kGAckfQkJeJIt8st5dglvd.jpg',
    backdrop: 'ptpr0kGAckfQkJeJIt8st5dglvd.jpg',
    description: 'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    tag: 'LANDMARK FILM',
  },
  {
    id: 'batman', title: 'The Batman', year: 2022, rating: 'PG-13', score: '7.8',
    duration: '2h 56m', type: 'Movie', genre: 'Thriller',
    poster: '74xTEgt7R36Fpooo50r9T25onhq.jpg',
    backdrop: 'b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
    description: 'When a sadistic serial killer begins murdering key political figures, Batman is forced to investigate the corruption in Gotham City.',
    tag: 'DARK & GRIPPING',
  },
  {
    id: 'the-bear', title: 'The Bear', year: 2024, rating: 'TV-MA', score: '8.6',
    duration: '3 Seasons', type: 'Series', genre: 'Drama',
    poster: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=85',
    backdrop: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=85',
    description: 'A young chef returns to Chicago to run his family’s sandwich shop, finding chaos, grief, and a crew that feels like family.',
    tag: 'A STILLROOM SERIES',
  },
  {
    id: 'spider-verse', title: 'Across the Spider-Verse', year: 2023, rating: 'PG', score: '8.6',
    duration: '2h 20m', type: 'Movie', genre: 'Animation',
    poster: '8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    backdrop: '8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    description: 'Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its existence.',
    tag: 'VISUALLY BREATHTAKING',
  },
  {
    id: 'arrival', title: 'Arrival', year: 2016, rating: 'PG-13', score: '7.9',
    duration: '1h 56m', type: 'Movie', genre: 'Sci-fi',
    poster: 'x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg',
    backdrop: 'x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg',
    description: 'A linguist is recruited by the military to communicate with alien lifeforms after mysterious spacecraft touch down around the world.',
    tag: 'TIMELESS SCI-FI',
  },
  {
    id: 'severance', title: 'Severance', year: 2022, rating: 'TV-MA', score: '8.7',
    duration: '2 Seasons', type: 'Series', genre: 'Thriller',
    poster: 'lFf6LLrQjYldcZItzOkGmMMigP7.jpg',
    backdrop: 'lFf6LLrQjYldcZItzOkGmMMigP7.jpg',
    description: 'At Lumon Industries, employees undergo a procedure that surgically divides their memories between work and personal life.',
    tag: 'ONE MORE EPISODE',
  },
  {
    id: 'the-menu', title: 'The Menu', year: 2022, rating: 'R', score: '7.2',
    duration: '1h 47m', type: 'Movie', genre: 'Thriller',
    poster: 'fPtUgMcLIboqlTlPrq0bQpKK8eq.jpg',
    backdrop: 'fPtUgMcLIboqlTlPrq0bQpKK8eq.jpg',
    description: 'A young couple travels to a remote island to eat at an exclusive restaurant where the chef has prepared a lavish menu.',
    tag: 'A TASTE FOR THRILLS',
  },
]

const continueWatching = [
  { id: 'severance', progress: 0.68, episode: 'S2 E4 · Woe’s Hollow', time: '18 min left' },
  { id: 'the-bear', progress: 0.35, episode: 'S3 E2 · Next', time: '29 min left' },
  { id: 'arrival', progress: 0.82, episode: 'Continue watching', time: '21 min left' },
]

const genres = ['All', 'Sci-fi', 'Drama', 'Thriller', 'Romance', 'Animation']
const findTitle = (id) => titles.find((title) => title.id === id)

function PosterCard({ title, onSelect, saved, onToggleSave }) {
  return (
    <article className="poster-card">
      <button className="poster-card__image-button" onClick={() => onSelect(title)} aria-label={`View ${title.title}`}>
        <img className="poster-card__image" src={artwork(title.poster)} alt={`${title.title} poster`} loading="lazy" />
        <span className="poster-card__hover"><Play size={18} fill="currentColor" /> View title</span>
      </button>
      <button
        className={`poster-card__save ${saved ? 'is-saved' : ''}`}
        onClick={() => onToggleSave(title.id)}
        aria-label={saved ? `Remove ${title.title} from My List` : `Add ${title.title} to My List`}
        title={saved ? 'Remove from My List' : 'Add to My List'}
      >
        {saved ? <Check size={16} /> : <Plus size={17} />}
      </button>
      <button className="poster-card__meta" onClick={() => onSelect(title)}>
        <span className="poster-card__title">{title.title}</span>
        <span className="poster-card__sub">{title.year} <i /> {title.genre}</span>
      </button>
    </article>
  )
}

function ContentRow({ title, items, onSelect, savedIds, onToggleSave }) {
  const trackRef = useRef(null)

  const scroll = (direction) => {
    trackRef.current?.scrollBy({ left: direction * 560, behavior: 'smooth' })
  }

  return (
    <section className="content-row">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          <span className="section-heading__rule" />
        </div>
        <div className="row-controls">
          <button className="icon-button row-arrow" onClick={() => scroll(-1)} aria-label={`Scroll ${title} left`}><ArrowLeft size={17} /></button>
          <button className="icon-button row-arrow" onClick={() => scroll(1)} aria-label={`Scroll ${title} right`}><ArrowRight size={17} /></button>
        </div>
      </div>
      <div className="poster-track" ref={trackRef}>
        {items.map((titleItem) => (
          <PosterCard
            key={titleItem.id}
            title={titleItem}
            onSelect={onSelect}
            saved={savedIds.includes(titleItem.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>
    </section>
  )
}

function App() {
  const [activeNav, setActiveNav] = useState('Discover')
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [savedIds, setSavedIds] = useState(['past-lives', 'arrival'])
  const [selectedTitle, setSelectedTitle] = useState(null)
  const [previewTitle, setPreviewTitle] = useState(null)
  const [showGenres, setShowGenres] = useState(false)
  const appRef = useRef(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo('.hero-copy > *', { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.12,
      })
      gsap.fromTo('.continue-card', { y: 18, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 0.34,
      })
    }, appRef)
    return () => context.revert()
  }, [])

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key === 'Escape') {
        setSelectedTitle(null)
        setPreviewTitle(null)
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [])

  const matchingTitles = useMemo(() => {
    const query = search.trim().toLowerCase()
    return titles.filter((title) => {
      const matchesQuery = !query || `${title.title} ${title.genre} ${title.type} ${title.year}`.toLowerCase().includes(query)
      const matchesGenre = genre === 'All' || title.genre === genre
      const matchesType = activeNav === 'Films' ? title.type === 'Movie' : activeNav === 'Series' ? title.type === 'Series' : true
      return matchesQuery && matchesGenre && matchesType
    })
  }, [search, genre, activeNav])

  const toggleSaved = (id) => {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const openNav = (item) => {
    setActiveNav(item)
    setSearch('')
    setGenre('All')
  }

  const watchlistTitles = savedIds.map(findTitle).filter(Boolean)
  const isFiltering = Boolean(search.trim()) || genre !== 'All' || activeNav === 'Films' || activeNav === 'Series'
  const displayTitle = activeNav === 'My List' ? 'My List' : search ? 'Search results' : `${genre === 'All' ? 'All' : genre} picks`

  const navItems = [
    { label: 'Discover', icon: Compass },
    { label: 'Series', icon: Tv },
    { label: 'Films', icon: Film },
    { label: 'My List', icon: Bookmark },
  ]
  const featuredTitle = findTitle('dune-two')

  return (
    <div className="app-shell min-h-screen" ref={appRef}>
      <aside className="sidebar">
        <button className="brand-mark" onClick={() => openNav('Discover')} aria-label="Stillroom home">
          <span className="brand-mark__symbol"><span /><span /><span /></span>
          <span className="brand-mark__name">stillroom</span>
        </button>
        <span className="sidebar-label">LIBRARY</span>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`side-nav__item ${activeNav === label ? 'is-active' : ''}`} onClick={() => openNav(label)}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {label === 'My List' && <span className="side-nav__count">{savedIds.length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="profile-summary">
            <span className="profile-avatar">J</span>
            <span className="profile-copy"><strong>Jordan Lee</strong><small>Premium member</small></span>
          </div>
        </div>
      </aside>

      <main className="main-content flex min-w-0 flex-col">
        <header className="topbar">
          <div className="breadcrumb"><span>STILLROOM</span><span className="breadcrumb__slash">/</span><strong>{activeNav.toUpperCase()}</strong></div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />
              <input ref={searchInputRef} value={search} onChange={(event) => { setSearch(event.target.value); if (event.target.value) setActiveNav('Discover') }} placeholder="Titles, people, genres..." aria-label="Search titles, people, or genres" />
              {search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={15} /></button>}
              {!search && <kbd>⌘ K</kbd>}
            </label>
            <span className="topbar-avatar" aria-hidden="true">JL</span>
          </div>
        </header>

        {activeNav === 'Discover' && !search && genre === 'All' && (
          <>
            <section className="featured-hero" style={{ '--hero-image': `url(${artwork(featuredTitle.backdrop, 'original')})` }}>
              <div className="featured-hero__scrim" />
              <div className="featured-hero__content">
                <div className="hero-copy">
                  <div className="eyebrow"><span className="eyebrow__line" /> {featuredTitle.tag}</div>
                  <div className="feature-title-wrap"><span className="feature-overline">A FILM BY DENIS VILLENEUVE</span><h1>DUNE: PART<br /><em>TWO</em></h1></div>
                  <div className="hero-meta">
                    <span className="hero-meta__score"><Star size={13} fill="currentColor" /> {featuredTitle.score}</span>
                    <span>{featuredTitle.year}</span><i /><span>{featuredTitle.duration}</span><i /><span>{featuredTitle.rating}</span>
                  </div>
                  <p className="hero-description">On Arrakis, Paul joins the Fremen and faces the future his family tried to escape.</p>
                  <div className="hero-actions">
                    <button className="button button--light" onClick={() => setPreviewTitle(featuredTitle)}><Play size={16} fill="currentColor" /> Watch now</button>
                    <button className="button button--outline" onClick={() => setSelectedTitle(featuredTitle)}><Info size={16} /> Details</button>
                    <button className={`hero-save ${savedIds.includes(featuredTitle.id) ? 'is-saved' : ''}`} onClick={() => toggleSaved(featuredTitle.id)} aria-label={savedIds.includes(featuredTitle.id) ? 'Remove Dune: Part Two from My List' : 'Add Dune: Part Two to My List'} title={savedIds.includes(featuredTitle.id) ? 'Remove from My List' : 'Add to My List'}>{savedIds.includes(featuredTitle.id) ? <Check size={18} /> : <Plus size={18} />}</button>
                  </div>
                </div>
              </div>
            </section>

            <section className="continue-section">
              <div className="section-heading section-heading--continue">
                <div><span className="section-kicker"><Clock3 size={12} /> RECENTLY PLAYED</span><h2>Continue watching</h2></div>
              </div>
              <div className="continue-track">
                {continueWatching.map((item, index) => {
                  const title = findTitle(item.id)
                  return (
                    <button className="continue-card" key={item.id} onClick={() => setPreviewTitle(title)}>
                      <span className="continue-card__art" style={{ backgroundImage: `url(${artwork(title.backdrop)})` }}>
                        <span className="continue-card__shade" />
                        <span className="continue-card__play"><Play size={17} fill="currentColor" /></span>
                        <span className="continue-card__number">0{index + 1}</span>
                      </span>
                      <span className="continue-card__info"><span className="continue-card__title">{title.title}</span><span className="continue-card__episode">{item.episode}</span><span className="continue-progress"><i style={{ width: `${item.progress * 100}%` }} /></span><span className="continue-card__time">{item.time}</span></span>
                    </button>
                  )
                })}
              </div>
            </section>
          </>
        )}

        <section className={`catalog-section ${activeNav === 'Discover' && !search && genre === 'All' ? 'catalog-section--home' : ''}`}>
          <div className="catalog-toolbar">
            <div className="section-heading catalog-heading">
              <div><span className="section-kicker"><Clapperboard size={12} /> CATALOG</span><h2>{isFiltering || activeNav === 'My List' ? displayTitle : 'Popular titles'}</h2></div>
                  {!search && <button className={`filter-trigger ${showGenres ? 'is-open' : ''}`} onClick={() => setShowGenres((value) => !value)} aria-label="Filter genres" title="Filter genres"><ArrowDownWideNarrow size={15} /> <span>Filter</span><ChevronDown size={13} /></button>}
            </div>
            <div className={`genre-bar ${showGenres || genre !== 'All' || search ? 'is-visible' : ''}`}>
              {genres.map((item) => <button key={item} onClick={() => setGenre(item)} className={`genre-chip ${genre === item ? 'is-selected' : ''}`}>{item}</button>)}
            </div>
          </div>

          {activeNav === 'My List' ? (
            watchlistTitles.length ? <div className="poster-grid">{watchlistTitles.map((title) => <PosterCard key={title.id} title={title} onSelect={setSelectedTitle} saved onToggleSave={toggleSaved} />)}</div> : <div className="empty-state"><Bookmark size={28} /><h3>Your list is waiting</h3><p>Save films and series to keep them close.</p><button className="button button--light" onClick={() => openNav('Discover')}>Explore titles <ArrowRight size={15} /></button></div>
          ) : isFiltering ? (
            matchingTitles.length ? <div className="poster-grid">{matchingTitles.map((title) => <PosterCard key={title.id} title={title} onSelect={setSelectedTitle} saved={savedIds.includes(title.id)} onToggleSave={toggleSaved} />)}</div> : <div className="empty-state"><Search size={28} /><h3>No titles found</h3><p>Try a different title, genre, or year.</p></div>
          ) : (
            <>
              <ContentRow title="Featured films & series" items={titles.filter((title) => ['poor-things', 'past-lives', 'severance', 'the-menu', 'spider-verse', 'batman'].includes(title.id))} onSelect={setSelectedTitle} savedIds={savedIds} onToggleSave={toggleSaved} />
              <ContentRow title="More to explore" items={titles.filter((title) => ['oppenheimer', 'dune-two', 'the-bear', 'arrival', 'poor-things', 'spider-verse'].includes(title.id))} onSelect={setSelectedTitle} savedIds={savedIds} onToggleSave={toggleSaved} />
            </>
          )}
        </section>

        <footer className="page-footer"><span>STILLROOM</span><span>© STILLROOM</span></footer>
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map(({ label, icon: Icon }) => <button key={label} className={activeNav === label ? 'is-active' : ''} onClick={() => openNav(label)} aria-label={label}><Icon size={19} /><span>{label}</span></button>)}
      </nav>

      {selectedTitle && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedTitle(null) }}>
          <section className="detail-modal" role="dialog" aria-modal="true" aria-label={`${selectedTitle.title} details`}>
            <button className="modal-close" onClick={() => setSelectedTitle(null)} aria-label="Close details"><X size={19} /></button>
            <div className="detail-modal__image" style={{ backgroundImage: `url(${artwork(selectedTitle.backdrop, 'original')})` }}><span className="detail-modal__fade" /><span className="detail-modal__tag">{selectedTitle.tag}</span></div>
            <div className="detail-modal__body">
              <span className="section-kicker"><Info size={12} /> TITLE DETAILS</span>
              <h2>{selectedTitle.title}</h2>
              <div className="hero-meta"><span className="hero-meta__score"><Star size={13} fill="currentColor" /> {selectedTitle.score}</span><span>{selectedTitle.year}</span><i /><span>{selectedTitle.duration}</span><i /><span>{selectedTitle.rating}</span><i /><span>{selectedTitle.type}</span></div>
              <p>{selectedTitle.description}</p>
              <div className="detail-modal__actions"><button className="button button--light" onClick={() => { setPreviewTitle(selectedTitle); setSelectedTitle(null) }}><Play size={16} fill="currentColor" /> Watch now</button><button className="button button--outline" onClick={() => toggleSaved(selectedTitle.id)}>{savedIds.includes(selectedTitle.id) ? <Check size={16} /> : <Plus size={16} />}{savedIds.includes(selectedTitle.id) ? 'In My List' : 'Add to My List'}</button></div>
            </div>
          </section>
        </div>
      )}

      {previewTitle && (
        <div className="modal-backdrop player-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewTitle(null) }}>
          <section className="player-modal" role="dialog" aria-modal="true" aria-label={`${previewTitle.title} preview`} style={{ backgroundImage: `url(${artwork(previewTitle.backdrop, 'original')})` }}>
            <button className="modal-close player-close" onClick={() => setPreviewTitle(null)} aria-label="Close preview"><X size={19} /></button>
            <div className="player-modal__veil" />
            <div className="player-center"><Clapperboard size={26} /><strong>{previewTitle.title}</strong></div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App