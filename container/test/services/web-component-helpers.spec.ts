import { GridCompoundRenderer,  CustomCompoundRenderer, deSanitizeParamsMap, DefaultCompoundRenderer } from "../../src/services/web-component-helpers";
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
  describe('constructor', () => {
    it('should create an instance with a superRenderer', () => {
      // Arrange
      const rendererObj = {
        use: {
          extends: 'superRendererType'
        },
        config: {}
      };
  
      // Act
      const renderer = new CustomCompoundRenderer(rendererObj);
  
      // Assert
      expect(renderer).toBeInstanceOf(CustomCompoundRenderer);
      expect(renderer.superRenderer).toBeDefined();
      // You can add additional assertions to verify the superRenderer's properties.
    });
  });

describe('createCompoundContainer', () => {
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

  it('should call the provided createCompoundContainer function', () => {
    const rendererObj = {
      use: {
        createCompoundContainer: jest.fn(),
      },
      config: {},
    };
    // Arrange
    const renderer = new CustomCompoundRenderer(rendererObj);
    const createCompoundContainerFn = jest.fn();
    renderer.rendererObject.use.createCompoundContainer = createCompoundContainerFn;

    // Act
    const result = renderer.createCompoundContainer();

    // Assert
    expect(result).toBeUndefined();
    expect(createCompoundContainerFn).toHaveBeenCalledWith(renderer.config, renderer.superRenderer);
  });

  it('should call the superRenderer\'s createCompoundContainer when no function is provided', () => {
    // Arrange
    const rendererObj = {
      use: {
      },
      config: {},
    };
    const renderer = new CustomCompoundRenderer(rendererObj);
   
    const superRenderer = new CustomCompoundRenderer(rendererObj); // Create a mock superRenderer
    renderer.superRenderer = superRenderer;
    const mockElm = document.createElement('div')
    const createCompoundContainerSpy = jest.spyOn(superRenderer, 'createCompoundContainer').mockReturnValue(mockElm);


    // Act
    const result = renderer.createCompoundContainer();

    // Assert
    expect(result).toEqual(mockElm);
    expect(createCompoundContainerSpy ).toHaveBeenCalled();
  });


  it('should call the super.createCompoundContainer when no function or superRenderer is provided', () => {
    // Arrange
    const rendererObj = {
      use: {
      },
      config: {},
    };
    const renderer = new CustomCompoundRenderer(rendererObj);

    // Act
    const result = renderer.createCompoundContainer();

    // Assert
    expect(result).toBeInstanceOf(HTMLDivElement); // Assuming super.createCompoundContainer returns an HTMLDivElement
  });
});


  describe('createCompoundItemContainer', () => {
    it('should create a compound item container when defined', () => {
      // Arrange
      const rendererObj = {
        use: {
          createCompoundItemContainer: (layoutConfig, config, superRenderer) => {
            // Custom logic for creating a compound item container
            return document.createElement('span');
          },
        },
      };
      const customRenderer = new CustomCompoundRenderer(rendererObj);

      // Act
      const compoundItemContainer = customRenderer.createCompoundItemContainer({ layout: 'custom' });

      // Assert
      expect(compoundItemContainer).toBeInstanceOf(HTMLSpanElement);
    });
  
    it('should create a compound item container from superRenderer', () => {
      // Arrange
      const rendererObj = {
        use: {
          createCompoundItemContainer: undefined,
          extends: 'test'
        },
      };
      const customRenderer = new CustomCompoundRenderer(rendererObj);

      const mockDiv = document.createElement('div');
      mockDiv.style.color = 'red';
      
      // Act
      const compoundItemContainer = customRenderer.createCompoundItemContainer({ layout: 'custom' });

      // Assert
      expect(compoundItemContainer).toBeInstanceOf(HTMLDivElement);
  });


  it('should create a compound item container with superRenderer and use undefined', () => {
    // Arrange
    const rendererObj = {
      use: {
        createCompoundItemContainer: undefined,
      },
    };
    const customRenderer = new CustomCompoundRenderer(rendererObj);

    const mockDiv = document.createElement('div');
    mockDiv.style.color = 'red';
    
    // Act
    const compoundItemContainer = customRenderer.createCompoundItemContainer({ layout: 'custom' });

    // Assert
    expect(compoundItemContainer).toBeInstanceOf(HTMLDivElement);
  });
});


  describe('attachCompoundItem', () => {
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
      compoundItem.style.color = 'white';
  
      // Act
      customRenderer.attachCompoundItem(compoundContainer, compoundItem);
  
      // Assert
      expect(compoundContainer.contains(compoundItem)).toBe(true);
    });
  });





});

describe('GridCompoundRenderer', () => {
  it('should create a compound container with grid styles', () => {
    // Arrange
    const rendererObject = 
   {
    config: {
        columns: '1fr 2fr',
        rows: 'auto',
        gap: '10px',
        minHeight: '100px',
        layouts: [
          {
            minWidth: 600,
            columns: '1fr',
            rows: '1fr 1fr',
            gap: 5,
          },
        ],
      }
   };
   const config = rendererObject.config;
    const fixedTimestamp = 1619123456789;
    const mockDate = new Date(fixedTimestamp)
    const spyDate = jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
    const gridRenderer = new GridCompoundRenderer(rendererObject);

    // Act
    const compoundContainer = gridRenderer.createCompoundContainer();

    // Assert
    expect(compoundContainer).toBeInstanceOf(HTMLDivElement);

    expect(compoundContainer.classList[0]).toEqual(`__lui_compound_${fixedTimestamp}`);
    expect(compoundContainer.innerHTML).toContain('display: grid');
    expect(compoundContainer.innerHTML).toContain(`grid-template-columns: ${config.columns || 'auto'};`);
    expect(compoundContainer.innerHTML).toContain(`grid-template-rows: ${config.rows || 'auto'};`);
    expect(compoundContainer.innerHTML).toContain(`grid-gap: ${config.gap || '0'};`);
    expect(compoundContainer.innerHTML).toContain(`min-height: ${config.minHeight || 'auto'};`);

    spyDate.mockRestore()
    // dateNowSpy.mockRestore();
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

