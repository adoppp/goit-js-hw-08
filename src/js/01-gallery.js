// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector('.gallery');

// Создание и рендеринг разметки
const createGalleryItem = ({ preview, original, description }) => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');
    const link = document.createElement('a');
    link.classList.add('gallery__link');
    link.href = original;
    const image = document.createElement('img');
    image.classList.add('gallery__image');
    image.src = preview;
    image.setAttribute('data-source', original);
    image.alt = description;
    link.appendChild(image);
    galleryItem.appendChild(link);
    return galleryItem;
  };
  const galleryMarkup = galleryItems.map(createGalleryItem);
  galleryList.append(...galleryMarkup);
  // Реализация делегирования и получение URL большого изображения
  galleryList.addEventListener('click', handleGalleryItemClick);
  function handleGalleryItemClick(event) {
    event.preventDefault();
    const target = event.target;
    if (target.nodeName !== 'IMG') {
      return;
    }
    const source = target.dataset.source;
    openModal(source);
  }
  // Открытие модального окна по клику на элементе галереи
  function openModal(source) {
    const instance = basicLightbox.create(`<img src="${source}" width="800" height="600">`);
    instance.show();
    // Закрытие модального окна при нажатии на кнопку Esc
    const handleKeyPress = (event) => {
      if (event.code === 'Escape') {
        instance.close();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
  }