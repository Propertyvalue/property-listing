import type { Schema, Attribute } from '@strapi/strapi';

export interface CoordinatesCoordinates extends Schema.Component {
  collectionName: 'components_coordinates_coordinates';
  info: {
    displayName: 'Coordinates';
    icon: 'write';
  };
  attributes: {
    longitude: Attribute.Float;
    latitude: Attribute.Float;
  };
}

export interface FeaturesFeatures extends Schema.Component {
  collectionName: 'components_features_features';
  info: {
    displayName: 'features';
    icon: 'brush';
  };
  attributes: {
    features: Attribute.Text;
  };
}

export interface ImageImages extends Schema.Component {
  collectionName: 'components_image_images';
  info: {
    displayName: 'Images';
    icon: 'attachment';
  };
  attributes: {
    image_url: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'coordinates.coordinates': CoordinatesCoordinates;
      'features.features': FeaturesFeatures;
      'image.images': ImageImages;
    }
  }
}
