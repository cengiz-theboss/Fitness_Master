import { Clock, Flame, Heart } from 'lucide-react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onClick, onFavorite, isFavorite }) => {
  return (
    <div className="recipe-card" onClick={() => onClick(recipe)}>
      <div className="recipe-image">
        <img src={recipe.thumbnail} alt={recipe.title} />
        <div className="recipe-badge">{recipe.category}</div>
        <button 
          className={`recipe-favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(recipe);
          }}
        >
          <Heart size={20} fill={isFavorite ? "var(--accent-secondary)" : "none"} />
        </button>
      </div>
      <div className="recipe-info">
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-desc">{recipe.description}</p>
        <div className="recipe-meta">
          <div className="recipe-meta-item">
            <Clock size={16} />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="recipe-meta-item">
            <Flame size={16} />
            <span>{recipe.calories}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
