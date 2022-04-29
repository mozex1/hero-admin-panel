import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './app.scss';

const App = () => {
    
    return (
        <main className="app">
            <div className="content">
                <ErrorBoundary>
                    <HeroesList/>
                </ErrorBoundary>
                <div className="content__interactive">
                    <ErrorBoundary>
                        <HeroesAddForm/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <HeroesFilters/>
                    </ErrorBoundary>
                </div>
            </div>
        </main>
    )
}

export default App;