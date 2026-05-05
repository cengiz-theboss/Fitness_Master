import { useState } from 'react';
import { dummyVideos } from '../data/dummyData';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import './Recipes.css';

const Recipes = () => {
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('All');

  const recipeVideos = dummyVideos.filter(v => v.type === 'recipe');
  const categories = ['All', 'Lose Weight', 'Gain Weight'];

  const filteredRecipes = activeCategory === 'All' 
    ? recipeVideos 
    : recipeVideos.filter(v => v.category === activeCategory);

  const toggleFavorite = (video) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(video.id)) newFavs.delete(video.id);
      else newFavs.add(video.id);
      return newFavs;
    });
  };

  return (
    <div className="page-container section container">
      <div className="text-center" style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <h1 className="section-title text-gradient">Healthy Recipes</h1>
        <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Discover delicious, healthy meals tailored to your goals. Whether you want to shed pounds or build mass, we have the perfect recipe for you.
        </p>
      </div>

      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="video-grid">
        {filteredRecipes.map(recipe => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            onClick={setActiveRecipe}
            isFavorite={favorites.has(recipe.id)}
            onFavorite={toggleFavorite}
          />
        ))}
      </div>

      {activeRecipe && (
        <RecipeModal 
          recipe={activeRecipe} 
          onClose={() => setActiveRecipe(null)} 
        />
      )}
    </div>
  );
};

export default Recipes;
