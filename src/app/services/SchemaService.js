

class SchemaService {

    constructor(Schema) {

        this.store = this.store.bind(this) ;

        this.findAndSort = this.findAndSort.bind(this) ;
        
        this.findOne = this.findOne.bind(this) ;
        this.find = this.find.bind(this) ;
        this.findOneAndUpdate = this.findOneAndUpdate.bind(this) ;

        this.hasOne = this.hasOne.bind(this);
        this.hasAll = this.hasAll.bind(this) ;
        
        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.aggregate = this.aggregate.bind(this);
        this.update = this.update.bind(this);

        this.schema = Schema ;
    }

    async store( data ) {
        try {
            const doc = await this.schema.create(data) ;
            return doc ;
        } catch(err) {
          console.log("aaaaaaaaa");
            console.log(err);
            return false ;
        }
    }

    async findAndSort ( query, sort ) {
        try {
            const doc = await this.schema.find(query).sort(sort) ;

            return doc ;
        } catch (err) {
            return false ;
        }
    }
    async findOne( data ) {
        try {
            console.log(data);
            const doc = await this.schema.findOne(data) ;

            return doc ;
        }
        catch(err) {
            return false ;
        }
    }
    async find( query ) {
        try {
            const doc = await this.schema.find({query}) ;

            return doc ;
        } catch(err) {
            console.log(err);
            return false ;
        }
    }
    async findOneAndUpdate(query, update) {
        try {
            const doc = await this.schema.findOneAndUpdate(
                query,
                update,
                {
                    new: true,
                    runValidators: true
                }
            ) ;

            return doc ;
        } catch(err) {
            console.log(err) ;
            return false ;
        }
    }
    async hasOne( data , foreign_key) {
        try {
            const doc  = await this.schema.findOne(data).populate(foreign_key) ;

            return doc ;
        } catch (err) {
            console.log(err) ;
            return false ;
        }
    }
    async hasAll( data , foreign_key) {
        try {
            const doc  = await this.schema.find(data).populate(foreign_key) ;

            return doc ;
        } catch (err) {
            console.log(err) ;
            return false ;
        }
    }

    async delete(data) {
        try {
            const doc = await this.schema.deleteMany(data) ;

            console.log(doc) ;
            return true ;
        } catch(err) {
            console.log(err) ;
            return false ;
        }
    }

    async deleteAll(data, query) {
        try {
            const result = await this.schema.findByIdAndUpdate(data._id , query) ;

            console.log("deleteAll------------------", result)
            // await this.schema.deleteOne(data) ;

            return true ;
        } catch(err) {
            console.log(err) ;

            return false ;
        }
    }

    async aggregate(matchQuery, groupQuery) {
      try {
          const doc = await this.schema.aggregate([matchQuery, groupQuery]) ;

          if(doc.length) return doc[0] ;
          return null ;
      } catch(err) {
          console.log(err) ;

          return null ;
      }
    }

    async update(data, query) {
        try {
            const result = await this.schema.findByIdAndUpdate(data._id , query) ;
            return true ;
        } catch(err) {
            console.log(err) ;

            return false ;
        }
    }
}

export default SchemaService ;