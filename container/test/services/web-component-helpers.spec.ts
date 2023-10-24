import { resolveRenderer, registerEventListeners, GridCompoundRenderer,  CustomCompoundRenderer, deSanitizeParamsMap, DefaultCompoundRenderer } from "../../src/services/web-component-helpers";
import * as helperFunctions from  "../../src/services/web-component-helpers";

describe('deSanitizeParamsMap', () => {
    it('should desanitize object properties', () => {
        // Arrange
        const inputParamsMap = {
          name: 'John',
          age: 30,
        };
    
        // Act
        const desanitizedParamsMap = deSanitizeParamsMap(inputParamsMap);
    
        // Assert
        expect(desanitizedParamsMap).toEqual({
          name: 'John',
          age: '30', // Age is converted to a string
        });
      });
    
      it('should handle empty object', () => {
        // Arrange
        const inputParamsMap = {};
    
        // Act
        const desanitizedParamsMap = deSanitizeParamsMap(inputParamsMap);
    
        // Assert
        expect(desanitizedParamsMap).toEqual({});
      });

});

describe('DefaultCompoundRenderer', () => {
    it('should create a compound container', () => {
        // Arrange
        const renderer = new DefaultCompoundRenderer();
    
        // Act
        const compoundContainer = renderer.createCompoundContainer();
    
        // Assert
        expect(compoundContainer).toBeInstanceOf(HTMLDivElement);
      });
    
      it('should create a compound item container', () => {
        // Arrange
        const renderer = new DefaultCompoundRenderer();
    
        // Act
        const compoundItemContainer = renderer.createCompoundItemContainer();
    
        // Assert
        expect(compoundItemContainer).toBeInstanceOf(HTMLDivElement);
      });

      it('should attach a compound item to a compound container', () => {
        // Arrange
        const renderer = new DefaultCompoundRenderer();
        const compoundContainer = document.createElement('div');
        const compoundItem = document.createElement('div');
    
        // Act
        renderer.attachCompoundItem(compoundContainer, compoundItem);
    
        // Assert
        expect(compoundContainer.contains(compoundItem)).toBe(true);
      });

      it('should initialize config if a renderer object is not provided', () => {
        // Arrange
        const renderer = new DefaultCompoundRenderer();
    
        // Assert
        expect(renderer.config).toEqual({});
      });

      it('should initialize config from the renderer object if provided', () => {
        // Arrange
        const rendererObject = {
          config: {
            key: 'value',
          },
        };
    
        // Act
        const renderer = new DefaultCompoundRenderer(rendererObject);
    
        // Assert
        expect(renderer.config).toEqual(rendererObject.config);
      });

});


describe('CustomCompoundRenderer', () => {
  it('should create a custom compound container when defined', () => {
    // Arrange
    const rendererObj = {
      use: {
        createCompoundContainer: (config, superRenderer) => {
          // Custom logic for creating a compound container
          return document.createElement('div');
        },
      },
    };
    const customRenderer = new CustomCompoundRenderer(rendererObj);

    // Act
    const compoundContainer = customRenderer.createCompoundContainer();

    // Assert
    expect(compoundContainer).toBeInstanceOf(HTMLDivElement);
    // You can add more specific assertions for the custom logic
  });

  it('should create a compound item container when defined', () => {
    // Arrange
    const rendererObj = {
      use: {
        createCompoundItemContainer: (layoutConfig, config, superRenderer) => {
          // Custom logic for creating a compound item container
          return document.createElement('div');
        },
      },
    };
    const customRenderer = new CustomCompoundRenderer(rendererObj);

    // Act
    const compoundItemContainer = customRenderer.createCompoundItemContainer({ layout: 'custom' });

    // Assert
    expect(compoundItemContainer).toBeInstanceOf(HTMLDivElement);
    // You can add more specific assertions for the custom logic
  });

  it('should attach a compound item with custom logic when defined', () => {
    // Arrange
    const rendererObj = {
      use: {
        attachCompoundItem: (compoundCnt, compoundItemCnt, superRenderer) => {
          // Custom logic for attaching a compound item
          compoundCnt.appendChild(compoundItemCnt);
        },
      },
    };
    const customRenderer = new CustomCompoundRenderer(rendererObj);
    const compoundContainer = document.createElement('div');
    const compoundItem = document.createElement('div');

    // Act
    customRenderer.attachCompoundItem(compoundContainer, compoundItem);

    // Assert
    expect(compoundContainer.contains(compoundItem)).toBe(true);
    // You can add more specific assertions for the custom logic
  });
});

describe('GridCompoundRenderer', () => {
  it('should create a compound container with grid styles', () => {
    // Arrange
    const config = {
      columns: '1fr 2fr',
      rows: 'auto',
      gap: '10px',
      minHeight: '100px',
      layouts: [
        {
          minWidth: 600,
          columns: '1fr',
          rows: 'auto 1fr',
          gap: '5px',
        },
      ],
    };
    const fixedTimestamp = 1619123456789;
    const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(fixedTimestamp);


    const gridRenderer = new GridCompoundRenderer(config);
    // Date().getTime = jest.fn();
    // Act
    const compoundContainer = gridRenderer.createCompoundContainer();

    // Assert
    expect(compoundContainer).toBeInstanceOf(HTMLDivElement);

    // You can add more specific assertions to check the generated HTML and styles
    expect(compoundContainer.classList[0]).toEqual(`__lui_compound_${fixedTimestamp}`);
    expect(compoundContainer.innerHTML).toContain('display: grid');
  });

  it('should create a compound item container with grid row and column styles', () => {
    // Arrange
    const layoutConfig = {
      row: 1,
      column: 2,
    };

    const gridRenderer = new GridCompoundRenderer();

    // Act
    const compoundItemContainer = gridRenderer.createCompoundItemContainer(layoutConfig);

    // Assert
    expect(compoundItemContainer).toBeInstanceOf(HTMLDivElement);

    // You can add more specific assertions for the generated HTML and styles
    expect(compoundItemContainer.getAttribute('style')).toContain('grid-row: 1');
    expect(compoundItemContainer.getAttribute('style')).toContain('grid-column: 2');
  });
});

