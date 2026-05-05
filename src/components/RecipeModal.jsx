import { X, Clock, Flame, CheckCircle2 } from 'lucide-react';
import './RecipeModal.css';

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="recipe-modal-overlay">
      <div className="recipe-modal-content">
        <button className="recipe-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="recipe-modal-hero">
          <img src={recipe.thumbnail} alt={recipe.title} />
          <div className="recipe-modal-hero-content">
            <span className="recipe-modal-badge">{recipe.category}</span>
            <h2 className="recipe-modal-title">{recipe.title}</h2>
            <div className="recipe-modal-quick-stats">
              <div className="stat">
                <Clock size={20} />
                <span>{recipe.prepTime}</span>
              </div>
              <div className="stat">
                <Flame size={20} />
                <span>{recipe.calories}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="recipe-modal-body">
          <div className="recipe-macros-grid">
            <div className="macro-card">
              <span className="macro-value">{recipe.macros.protein}</span>
              <span className="macro-label">Protein</span>
            </div>
            <div className="macro-card">
              <span className="macro-value">{recipe.macros.carbs}</span>
              <span className="macro-label">Carbs</span>
            </div>
            <div className="macro-card">
              <span className="macro-value">{recipe.macros.fat}</span>
              <span className="macro-label">Fat</span>
            </div>
          </div>

          <div className="recipe-details-grid">
            <div className="ingredients-section">
              <h3>Ingredients</h3>
              <ul className="ingredients-list">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>
                    <span className="dot"></span>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="steps-section">
              <h3>Directions</h3>
              <div className="steps-list">
                {recipe.steps.map((step, i) => (
                  <div key={i} className="step-item">
                    <div className="step-number">{i + 1}</div>
                    <p className="step-text">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="recipe-modal-footer">
            <button className="btn btn-primary" onClick={onClose}>
              <CheckCircle2 size={18} style={{ marginRight: '8px' }} />
              I've cooked this!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
